import * as Types from 'types/database';

const tables: {
  rooms: Types.Room[];
  users: Types.User[];
  userRoom: Types.UserRoom[];
  sessions: Types.Session[];
  sessionUser: Types.SessionUser[];
  sessionMatch: Types.SessionMatch[];
  sessionMatchTime: Types.SessionMatchTimes[];
} = {
  rooms: [],
  users: [],
  userRoom: [],
  sessions: [],
  sessionUser: [],
  sessionMatch: [],
  sessionMatchTime: [],
};

const model: Types.Model = <T extends Types.BaseTable>(name) => {
  const table = tables?.[name] as T[];

  const getOne: Types.ModelFunc<T>['getOne'] = (filter) => {
    const filterFunc = (item: T) => {
      return Object.keys(filter).reduce((acc, key) => {
        if (!acc) return acc;

        return item?.[key] === filter?.[key];
      }, true);
    };

    return table.find(filterFunc);
  };

  const getAll: Types.ModelFunc<T>['getAll'] = (filter) => {
    const filterFunc = (item: T) => {
      return Object.keys(filter).reduce((acc, key) => {
        if (!acc) return acc;

        return item?.[key] === filter?.[key];
      }, true);
    };

    return table.filter(filterFunc);
  };

  const insert: Types.ModelFunc<T>['insert'] = (data) => {
    const id = (tables[name][tables[name].length - 1]?.id || 0) + 1;

    tables[name].push({ ...data, id });

    return id;
  };

  const update: Types.ModelFunc<T>['update'] = (id, data) => {
    const index = table.findIndex((item) => item.id === id);

    if (index < 0) return;

    const oldData = table?.[index];

    tables[name][index] = { ...oldData, ...data };

    return id;
  };

  const remove: Types.ModelFunc<T>['remove'] = (id) => {
    const index = table.findIndex((item) => item.id === id);

    if (index < 0) return;

    tables[name][index] = undefined;

    return id;
  };

  return { getOne, getAll, insert, update, remove };
};

export default model;
