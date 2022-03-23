const render = (state) => {
  const taskContainer = document.querySelector('[data-container="tasks"]');
  const listContainer = document.querySelector('[data-container="lists"]');
  const listUl = document.createElement('ul');
  const taskUl = document.createElement('ul');
  const listArr = state.lists.map(({ name }) => {
    const liElem = document.createElement('li');
    if (name === state.chosenList) {
      liElem.innerHTML = `<b>${name}</b>`;
      return liElem;
    }
    liElem.innerHTML = `<a href="#${name}">${name}</a>`;
    liElem.addEventListener('click', (e) => {
      const value = e.target.getAttribute('href').slice(1);
      state.chosenList = value;
      render(state, false);
    });
    return liElem;
  });
  listUl.append(...listArr);
  listContainer.replaceChildren(listUl);
  const filtered = state.tasks.filter(({ listName }) => state.chosenList === listName);
  if (filtered.length === 0) {
    taskContainer.innerHTML = '';
    return;
  }
  const taskArr = filtered.map(({ name }) => {
    const liElem = document.createElement('li');
    liElem.textContent = name;
    return liElem;
  });
  taskUl.append(...taskArr);
  taskContainer.replaceChildren(taskUl);
};

const app = () => {
  const state = {
    lists: [{
      name: 'General',
      id: 0,
    }],
    tasks: [],
    chosenList: 'General',
  };

  const forms = document.querySelectorAll('form[data-container]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = e.target.elements.name.value;
      const isList = e.target.dataset.container.includes('list');
      if (isList) {
        const list = {
          name: value,
          id: state.lists.length,
        };
        state.lists.push(list);
      } else {
        const task = {
          name: value,
          id: state.tasks.length,
          listName: state.chosenList,
        };
        state.tasks.push(task);
      }
      e.target.reset();
      render(state);
    });
  });
  render(state);
};

app();
