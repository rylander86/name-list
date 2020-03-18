import * as React from 'react';
import {Button} from "@material-ui/core";
import {Name} from './Names';
import './NameList.scss';

type NameListProps = {
  names: Name[];
  removeName: (id: string) => void;
};

function NameList({names, removeName}: NameListProps) {
    return <div className='name-list'>
        {names.length === 0 && <p><i>No names added to the list yet.</i></p>}
        {names.length > 0 && names
            .map(({name, id}) => <p key={id}>
                <Button
                    onClick={() => removeName(id)}
                    size={'small'}
                    variant={'outlined'}
                    color={'primary'}>Remove</Button> {name}
            </p>)}
    </div>
}

export default NameList;