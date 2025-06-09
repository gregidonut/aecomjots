import {
    createContext,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import { Template, NoteTop } from "@/utils/models";

export type NoteValue = {
    mainEditorVal: string;
    setMainEditorVal: Dispatch<SetStateAction<string>>;
    currentNoteTop: NoteTop | null;
    setCurrentNoteTop: Dispatch<SetStateAction<NoteTop | null>>;
    templates: Template[];
    setTemplates: Dispatch<SetStateAction<Template[]>>;
};

const NoteContext = createContext<NoteValue | null>(null);
export default NoteContext;

export function useNote(): NoteValue | null {
    return useContext(NoteContext);
}

type EditContextVal = { fkb_id: number; editting: boolean };
const EditContext = createContext<{
    setter: Dispatch<SetStateAction<EditContextVal[]>>;
    editContextVals: EditContextVal[];
} | null>(null);
