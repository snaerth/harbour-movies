import { supabase } from '../lib/supabase';

export const createTODOList = async ({ name, email }: { name: string; email: string }) => {
  const res = await supabase.from('todo_lists').select('name,email').match({ name, email });

  if (res.data.length > 0) {
    throw new Error('List already exists');
  }

  const { data, error } = await supabase.from('todo_lists').insert({ name, email }).select('*');

  if (error) {
    throw error;
  }

  return data[0];
};

export const deleteTODOList = async (id: string) => {
  const tasksRes = await supabase.from('todo_tasks').delete().eq('todo_list_id', id);

  if (tasksRes.error) {
    throw tasksRes.error;
  }

  const res = await supabase.from('todo_lists').delete().eq('id', id);

  if (res.error) {
    throw res.error;
  }

  return true;
};

export type AddTODOParams = {
  desc: string;
  listId: number;
};

export const addTODO = async ({ desc, listId }: AddTODOParams) => {
  const res = await supabase.from('todo_lists').select('*').eq('id', listId);

  if (res.data?.length === 0) {
    throw new Error(`List with id ${listId} does not exist`);
  }

  if (res.error) {
    throw res.error;
  }
  const { data, error } = await supabase
    .from('todo_tasks')
    .insert({
      todo_list_id: listId,
      desc,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
};

export const finishTODO = async (id: string, listId: number) => {
  const { data, error } = await supabase
    .from('todo_tasks')
    .update({ finished: true })
    .match({ id, todo_list_id: listId })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
};

export const removeTODO = async (id: string, listId: number) => {
  const { error } = await supabase.from('todo_tasks').delete().match({ id, todo_list_id: listId });

  if (error) {
    throw error;
  }

  return true;
};

export const getTODOLists = async (email: string) => {
  const { data, error } = await supabase.from('todo_lists').select('*').eq('email', email);

  if (error) {
    throw error;
  }

  return data;
};

export const getTODOList = async (id: number) => {
  const { data, error } = await supabase.from('todo_lists').select('*').eq('id', id);

  if (!data || data.length === 0) {
    throw new Error('List does not exist');
  }

  if (error) {
    throw error;
  }

  return data?.[0];
};

export const getTODOs = async (listId: number) => {
  const { data, error } = await supabase.from('todo_tasks').select('*').eq('todo_list_id', listId);

  if (error) {
    throw error;
  }

  return data;
};
