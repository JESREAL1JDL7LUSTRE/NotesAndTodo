export interface UserResponseHttpDataTodo {
    id: number;
    created_at: EpochTimeStamp;
    TodoTitle: string;
    TodoDesc: string;
    TodoDone: boolean;
    TodoDate: Date;
}

export interface UserResponseHttpDataNote {
    id: number;
    created_at: EpochTimeStamp;
    NoteTitle: string;
    NoteDesc: string;
}





