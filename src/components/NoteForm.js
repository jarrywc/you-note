import { withEditableResource } from "./withEditableResource";

export const NoteForm = withEditableResource(({ note, onChangeNote, onSaveNote, onResetNote }) => {
    const {  id, video_id, sort_id, content  } = note || {};

    return note ? (
        <>
            <label>
                ID:
                <input value={id} onChange={e => onChangeNote({ id: e.target.value })} />
            </label>
            <label>
                Content:
                <input type="content" value={content} onChange={e => onChangeNote({ content: e.target.value })} />
            </label>

            <button onClick={onResetNote}>Reset</button>
            <button onClick={onSaveNote}>Save Changes</button>
        </>
    ) : <p>Loading...</p>;
}, 'notes', 'note');