import { withEditableResource } from "./withEditableResource";

export const VideoInfoForm = withEditableResource(({ video, onChangeVideo, onSaveVideo, onResetVideo }) => {
    const {  ext_source, title  } = video || {};

    return user ? (
        <>
            <label>
                Title:
                <input value={title} onChange={e => onChangeVideo({ title: e.target.value })} />
            </label>
            <label>
                External Source/Url:
                <input type="ext_source" value={ext_source} onChange={e => onChangeVideo({ ext_source: e.target.value })} />
            </label>

            <button onClick={onResetVideo}>Reset</button>
            <button onClick={onSaveVideo}>Save Changes</button>
        </>
    ) : <p>Loading...</p>;
}, '/videos', 'user');