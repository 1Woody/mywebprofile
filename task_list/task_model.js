/*jshint esversion: 6 */

function TaskModel() {
  TaskModel.prototype.initial_tasks = [
    {
      title: "PMUD HTML exercise",
      done: true
    },
    {
      title: "PMUD CSS exercise",
      done: false
    },
    {
      title: "PMUD JavaScript exercise",
      done: false
    }
  ];

  this.tasks = JSON.parse(JSON.stringify(this.initial_tasks));

  //Returns the number of elements
  TaskModel.prototype.count = function() {
    return this.tasks.length;
  };

  //Returns all elements
  TaskModel.prototype.getAll = function() {
    let tasks = JSON.parse(JSON.stringify(this.tasks));
    tasks.map((e,i) => e.id = i);
    return tasks;
  };

  //Returns incomplete elements
  TaskModel.prototype.getIncomplete = function () {
    let tasks = JSON.parse(JSON.stringify(this.tasks));
    for (let i=0; i<tasks.length; i++){
      if (tasks[i].done) {
        tasks.splice(i,1);
        i--;
      }
    }
    tasks.map((e,i) => e.id = i );
    return tasks;
  };

  TaskModel.prototype.getSearch = function(text) {
    text=text.toLowerCase();
    let tasks = JSON.parse(JSON.stringify(this.tasks));
    for (let i=0;i<tasks.length;i++) {
      if (tasks[i].title.toLowerCase().search(text)==-1) {
        tasks.splice(i,1);
        i--;
      }
    }
    tasks.map((e, i) => e.id = i);
    return tasks;
  };

  /* Returns the element identified by (id).
  id: Element identification. */
  TaskModel.prototype.get = function(id) {
    const task = JSON.parse(JSON.stringify(this.tasks[id]));
    if (typeof task === "undefined") 
      throw console.error(`The value of id parameter is not valid.`);
    else 
      return task;
  };

  /* Adds a new element
  title: String with the tasks title.
  done: Boolean explaining if the tasks is done or not. */
  TaskModel.prototype.create = function(title, done=false) {
    this.tasks.push({
      title: (title || "").trim(),
      done
    });
  };
 
  /* Updates the element identified by (id).
  id: Element identification.
  title: String with the tasks title.
  done: Boolean explaining if the tasks is done or not. */
  TaskModel.prototype.update = function(id, title, done) {
    if (typeof this.tasks[id] === "undefined") {
      throw new Error(`The value of id parameter is not valid.`);
    } else {
      this.tasks.splice(id, 1, {
        title: (title || "").trim(),
        done
      });
    }
  };
  
  /* Deletes the element identified by (id).
  id: Element identification. */
  TaskModel.prototype.deletes = function(id) {
    if (typeof this.tasks[id] === "undefined") throw new Error(`The value of id parameter is not valid.`);
    else this.tasks.splice(id,1);
  };

  // Resets the element list to the initial values
  TaskModel.prototype.reset = function() {
    this.tasks = JSON.parse(JSON.stringify(this.initial_tasks));
  };
}
