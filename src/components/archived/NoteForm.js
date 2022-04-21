import { withEditableResource } from "./withEditableResource";

export const NoteForm = withEditableResource(({ note, onChangeNote, onSaveNote, onResetNote }) => {
    const {  ID, video_id, location_index, content  } = note || {};

    return note ? (
        <>
            <label>
                ID:
                <input value={ID} onChange={e => onChangeNote({ ID: e.target.value })} />
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