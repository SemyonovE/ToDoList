// Initialize filter parameters:
//  filterKey for filtering by importance:
//    -1 : everything
//     0 : normal
//     1 : importance
//     2 : very importance
//  displayMode for filterring by complete:
//    -1 : enerything
//     0 : currents
//     1 : completed
//  sorterMode for sorting tasks:
//    -1 : default
//     1 : title
//     2 : date
//     3 : first important
//     4 : first unimportant
//  tasklistStyle for display of line or square items of the task:
//     0 : line
//     1 : square
//  tabIndexDefault for number of the open tab:
//     0-4: number of the tab
export const settingDefault = {
  filterKey: -1,
  displayMode: 0,
  sorterMode: -1,
  tasklistStyle: 0,
  tabIndexDefault: 1,
  defineHeader: ""
};

// Empty task for initialization of the state of the component
export const initTask = {
  id: "",
  title: "",
  text: "",
  date: "",
  importance: "0",
  finished: ""
};
