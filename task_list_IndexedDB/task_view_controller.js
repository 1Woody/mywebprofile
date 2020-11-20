/*jshint esversion: 6 */
$(function() {

  function TaskVC(name = "Task", id = "#tasks", index = "0") {
    this.name = name;
    this.id = id;
    this.index = index;
    this.active = Cookie.get("active"+this.id) ? JSON.parse(Cookie.get("active"+this.id)) : false;
    this.search = Cookie.get("search"+this.id) ? JSON.parse(Cookie.get("search"+this.id)) : "";
    this.order  = Cookie.get("order"+this.id)  ? JSON.parse(Cookie.get("order"+this.id))  : {};
    this.itemsOnPage = Cookie.get("itemsOnPage"+this.id) ? JSON.parse(Cookie.get("itemsOnPage"+this.id)) : 10;
    this.Collapse = JSON.parse(Cookie.get("Collapse"+this.id)) == "show" ? "show" : "collapse";
  
    this.currentPage = 1;
    

    // VIEWs

    TaskVC.prototype.taskList = function(tasks) {
      $(document.getElementsByClassName("indexlist" + this.index)).text(this.name + " list");
      return `
      <span class="nobr" style="float:left;"><select name="itemsOnPage" class="iopage"><option value="5">5 Items/page</option><option value="10">10 Items/page</option><option value="25">25 Items/page</option><option value="50">50 Items/page</option><option value="100">100 Items/page</option></select>
      </span> <div class="pagination"></div>
      <div class="btn-group" role="group" aria-label="Taskbtgroup">
        <button class="new btn btn-success">New task</button>
        <button class="reset btn btn-danger">Reset tasks</button>
        <button class="list_a btn btn-secondary"></button>
      </div>
      <p/>
      Task Title
      <button class="uporder" title="Up order">&blacktriangle;</button>
      <button class="doorder" title="Down order">&blacktriangledown;</button>
      <button class="noorder" title="No order">&blacklozenge;</button>
      <span class="nobr"><input type="text" class="search" value="${this.search}" placeholder="Search" onfocus="let v=this.value; this.value=''; this.value=v"> <img class="dsearch" title="Clean Search" src="public/icon_delete.png"/></span>
      ` +
      tasks.reduce(
        (ac, task) => ac += 
        `<div>
        <button type="submit" class="delete btn-danger" taskid="${task.id}" title="Delete"> <img src="public/icon_delete.png"/> </button>
        <button type="button" class="edit btn-warning"   taskid="${task.id}" title="Edit"  > <img src="public/icon_edit.png"/> </button>
        <button type="button" class="switch btn-info" taskid="${task.id}" title=${task.done ? 'Start' : 'Stop'}> <img src="${task.done ? 'public/icon_play.png' : 'public/icon_stop.png'}"/> </button>
        ${task.title}
        </div>\n`, 
        "");
    };

    TaskVC.prototype.taskForm = function(msg, id, action, title, done) {
      return `<h1>${this.name} form</h1>
      ${msg}: <p class="form">
      <input type="text"     name="title"  value="${title}" placeholder="title"/>
      Done: 
      <input type="checkbox" name="done"   ${done ? 'checked' : ''}/>
      <button type="submit" class="${action}" taskid="${id}">${action}</button>
      </p>
      <button class="list">Go back</button>
      `;
    };


    // CONTROLLERs

    TaskVC.prototype.listController = function() {
      Cookie.set("active"+this.id, JSON.stringify(this.active), 7);
      Cookie.set("search"+this.id, JSON.stringify(this.search), 7);
      Cookie.set("order"+this.id,  JSON.stringify(this.order),  7);
      Cookie.set("itemsOnPage"+this.id, JSON.stringify(this.itemsOnPage), 7);
      Cookie.set("Collapse"+this.id, JSON.stringify(this.Collapse),7);

      let where = {};
      if (this.active)
        where.done = false;
      if (this.search)
        where.title = ["includes", this.search];

      let that = this;
      let p1 = this.task_model.getAll(where, this.order, (this.currentPage-1)*this.itemsOnPage, this.itemsOnPage);
      let p2 = this.task_model.count(where);
      Promise.all([p1, p2])
      .then(([tasks, count]) => {
        $(this.id).html(this.taskList(tasks));
        $(this.id+' .list_a').html(this.active ? 'All tasks' : 'Active tasks');
        $(this.id+' .iopage').val(this.itemsOnPage);
        $(this.id+' .pagination').pagination({
            items: count,
            itemsOnPage: this.itemsOnPage,
            currentPage: this.currentPage,
            cssStyle: 'compact-theme',
            onPageClick: (pn, e) => {this.currentPage = pn; this.listController(); $(this.id+' .pagination').pagination('drawPage', pn);}  
        });
        if (this.order.title === undefined) {
          $(this.id+' .noorder').show(); $(this.id+' .uporder').hide(); $(this.id+' .doorder').hide();
        } else if (this.order.title) {
          $(this.id+' .noorder').hide(); $(this.id+' .uporder').hide(); $(this.id+' .doorder').show();
        } else { 
          $(this.id+' .noorder').hide(); $(this.id+' .uporder').show(); $(this.id+' .doorder').hide();
        }
        if (this.search) $(this.id+' .search').focus();
      })
      .catch(error => {throw error;});
    };

    TaskVC.prototype.newController = function() {
      $(this.id).html(this.taskForm('New task', null, 'create', '', ''));
      $(this.id+' input[name=title]').focus();
    };

    TaskVC.prototype.editController = function(id) {
      this.task_model.get(id)
      .then(task => {
        $(this.id).html(this.taskForm('Edit task', id, 'update', task.title, task.done));
        $(this.id+' input[name=title]').focus();
      })
      .catch(error => {throw error;});
    };

    TaskVC.prototype.createController = function() {
      this.task_model.create($(this.id+' input[name=title]').val(), $(this.id+' input[name=done]').is(':checked')) 
      .then(() => {this.listController();})
      .catch(error => {throw error;});
    };

    TaskVC.prototype.updateController = function(id) {
      this.task_model.update(id, $(this.id+' input[name=title]').val(), $(this.id+' input[name=done]').is(':checked'))
      .then(() => {this.listController();})
      .catch(error => {throw error;});
    };

    TaskVC.prototype.switchController = function(id) {
      this.task_model.get(id)
      .then(task => {
        this.task_model.update(id, task.title, !task.done)
        .then(() => {this.listController();})
        .catch(error => {throw error;});
      })
      .catch(error => {throw error;});
    };

    TaskVC.prototype.deleteController = function(id) {
      this.task_model.get(id)
      .then(() => {
        if (confirm("Estas segur de que vols esborrar la tasca?")) {
          this.task_model.delete(id)
          .then(() => {this.listController();})
          .catch(error=> {throw error;}); 
        }
        })
        .catch(error => {throw error;});
    };

    TaskVC.prototype.resetController = function() {
      this.task_model.reset()
      .then(() => {this.listController();})
      .catch(error => {throw error;});
    };

    TaskVC.prototype.applyCookies = function() {
      let idtask = "#collapsetask" + this.index;
      $(idtask).removeClass();
      $(idtask).addClass(this.Collapse);
    }

    TaskVC.prototype.updateCookies = function() {
      if(this.Collapse == "show") this.Collapse = "collapse";
      else this.Collapse = "show";
      Cookie.set("Collapse"+this.id, JSON.stringify(this.Collapse),7);
    }

    // ROUTER

    TaskVC.prototype.eventsController = function() {
      $(document).on('click', this.id+' .list',   () => this.listController());
      $(document).on('click', this.id+' .list_a', () => {this.active = !this.active; this.listController();});
      $(document).on('click', this.id+' .new',    () => this.newController());
      $(document).on('click', this.id+' .edit',   (e)=> this.editController(Number($(e.currentTarget).attr('taskid'))));
      $(document).on('click', this.id+' .create', () => this.createController());
      $(document).on('click', this.id+' .update', (e)=> this.updateController(Number($(e.currentTarget).attr('taskid'))));
      $(document).on('click', this.id+' .switch', (e)=> this.switchController(Number($(e.currentTarget).attr('taskid'))));
      $(document).on('click', this.id+' .delete', (e)=> this.deleteController(Number($(e.currentTarget).attr('taskid'))));
      $(document).on('click', this.id+' .reset',  (e)=> this.resetController());
      $(document).on('input', this.id+' .iopage', () => {this.itemsOnPage = Number($(this.id+' .iopage').val()); this.currentPage = 1; this.listController();});
      $(document).on('input', this.id+' .search', () => {this.search = $(this.id+' .search').val(); this.listController();});
      $(document).on('click', this.id+' .dsearch',() => {this.search = ''; this.listController();});
      $(document).on('click', this.id+' .uporder',() => {this.order = {};             this.listController();});
      $(document).on('click', this.id+' .doorder',() => {this.order = {title: false}; this.listController();});
      $(document).on('click', this.id+' .noorder',() => {this.order = {title: true};  this.listController();});
      $(document).on('keypress', this.id+' .form',(e) => {if (e.keyCode === 13) $(this.id+ " button[type=submit]").trigger("click");});
      $(document).on('click', '#indexlist'+this.index, () => {this.updateCookies()});
    };

    // Creation of an object to manage the task model
    this.task_model = new TaskModel(this.id);
    this.applyCookies();
    setTimeout(() => {
      this.listController();
      this.eventsController();
    }, 500);
    
  }


  // Creation of an object View-Controller for the tasks
  let task_vc = new TaskVC();
  let task_vch = new TaskVC('Home task', '#home_tasks', "1");
  let task_uvch = new TaskVC('University task', '#university_tasks', "2");

  const mq = window.matchMedia( "(max-width: 768px)" );
  mq.addListener(mediaquery);
  mediaquery(mq);

  function mediaquery(mq) {
    if (mq.matches) { //under 768
      for (let i=0; i<3; i++){
        let idtask = "#collapsetask" + i;
        $(idtask).removeClass();
        $(idtask).addClass("collapse");
      }
    } else { // over768
      task_vc.applyCookies();
      task_vch.applyCookies();
      task_uvch.applyCookies();
    }
  }
});