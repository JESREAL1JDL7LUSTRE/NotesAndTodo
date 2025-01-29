import { supabase } from "@/createClient"

export const FetchDataTodo = async () => {
  const response = await supabase.from("BDforTodo").select("*")
  return response.data || [];
}

export const PushTodoData = async (TodoTitle: string, TodoDesc: string, TodoDone: boolean) => {
  const {error} = await supabase.from("BDforTodo").insert([{ TodoTitle, TodoDesc, TodoDone }]);

  if (error) {
    throw new Error(error.message)
  }

  return "All good bruhh";
}

export const PushDoneTodoData = async (Id: number) => {
  const { data, error } = await supabase
    .from("BDforTodo")
    .update({ TodoDone: true}) 
    .eq("id",Id);    

  if (error) {
    throw new Error(error.message);
  }
  console.log("update", data, Id)
};

export const PushDoneTodoDataRev = async (Id: number) => {
  const { data, error } = await supabase
    .from("BDforTodo")
    .update({ TodoDone: false}) 
    .eq("id",Id);    

  if (error) {
    throw new Error(error.message);
  }
  console.log("update", data, Id)
};

export const UpdateTodoData = async (Id: number, TodoTitle: string, TodoDesc: string) => {
  const { data, error } = await supabase
    .from("BDforTodo")
    .update({ TodoTitle, TodoDesc}) 
    .eq("id",Id);    

  if (error) {
    throw new Error(error.message);
  }
  console.log("update", data, Id)
};

export const DelTodoData = async (Id: number) => {
  const {data, error} = await supabase.from("BDforTodo").delete().eq("id", Id);
  if (error) {
    throw new Error(error.message)
  }
  console.log("delete",data, Id)
}


export const FetchDataNote = async () => {
  const response = await supabase.from("DBforNote").select("*")
  return response.data || [];
}

export const PushNoteData = async (NoteTitle: string, NoteDesc: string) => {
  const {error} = await supabase.from("DBforNote").insert([{ NoteTitle, NoteDesc }]);

  if (error) {
    throw new Error(error.message)
  }

  return "All good bruhh";
}

export const DelNoteData = async (Id: number) => {
  const {data, error} = await supabase.from("DBforNote").delete().eq("id", Id);
  if (error) {
    throw new Error(error.message)
  }
  console.log("delete",data, Id)
}

export const UpdateNoteData = async (Id: number, NoteTitle: string, NoteDesc: string) => {
  const { data, error } = await supabase
    .from("DBforNote")
    .update({ NoteTitle, NoteDesc}) 
    .eq("id",Id);    

  if (error) {
    throw new Error(error.message);
  }
  console.log("update", data, Id)
};