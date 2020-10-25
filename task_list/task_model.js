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

  TaskModel.prototype.getAll = function() {
    let tasks = JSON.parse(JSON.stringify(this.task));
    task.map((e,i) => e.id = i);
    return tasks;
  };

  /* Returns the element identified by (id).
  id: Element identification. */
  TaskModel.prototype.get = function(id) {
    const task = this.this.tasks[id];
    if (typeof task === "undefined") throw console.error(`The value of id parameter is not valid.`);
    else return JSON.parse(JSON.stringify(task));
  };

  
  /* Adds a new element
  title: String with the task title.
  done: Boolean explaining if the task is done or not. */
  TaskModel.prototype.create = (title, done=false) => {
    tasks.push({
      title: (title || "").trim(),
      done
    });
  };
  
  /* Updates the element identified by (id).
  id: Element identification.
  title: String with the task title.
  done: Boolean explaining if the task is done or not. */
  TaskModel.prototype.update = (id, title, done) => {
    if (typeof tasks[id] === "undefined") {
      throw new Error(`The value of id parameter is not valid.`);
    } else {
      tasks.splice(id, 1, {
        title: (title || "").trim(),
        done
      });
    }
  };
  
  /* Deletes the element identified by (id).
  id: Element identification. */
  TaskModel.prototype.deletes = id => {
    if (typeof tasks[id] === "undefined") throw new Error(`The value of id parameter is not valid.`);
    else tasks.splice(id,1);
  };

  // Resets the element list to the initial values
  TaskModel.prototype.reset = () => {
    tasks = initial_tasks;
  };
}
