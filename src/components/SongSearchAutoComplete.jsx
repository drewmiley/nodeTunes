import React from 'react';
import AutoComplete from 'react-autocomplete';

const SongSearchAutoComplete = props => {
    return (
        <div style={{ display: 'list-item' }}>
            <AutoComplete
                getItemValue={item => item}
                items={props.items.sort()}
                renderItem={(item, isHighlighted) =><div style={{ fontSize: '30px', background: isHighlighted ? 'lightgray' : 'white' }} key={item}>{item}</div>}
                shouldItemRender={(item, value) => item && item.toUpperCase().includes(value.toUpperCase())}
                value={props.value}
                inputProps={{ placeholder: props.placeholder }}
                menuStyle={{ width: '45%' }}
                onChange={e => props.setValue(e.target.value)}
                onSelect={val => props.setValue(val)}
            />
        </div>
    )
}

export default SongSearchAutoComplete;
