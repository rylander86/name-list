import * as React from "react";
import _ from 'lodash';
import {TextField, Button} from "@material-ui/core";
import {useState, useEffect, useCallback, FunctionComponent, SyntheticEvent} from "react";
import NameList from './NameList';

export type Name = {
    id: string;
    name: string;
}

function Names() {

    const [names, setNames] = useState<Name[]>([]);
    const [selectedName, setSelectedName] = useState<Name>();
    const [currentInput, setCurrentInput] = useState<string>('');
    const addName = useCallback((name) => {
        setNames([...names, {id: _.uniqueId(), name}]);
        setCurrentInput('');
    }, [names]);

    const removeName = useCallback((id: string): void => {
        setNames(names.filter(name => name.id !== id));
    }, [names]);

    const pickName = useCallback(() => {
        if (names.length > 0) {
            const index = _.random(0, names.length - 1);

            let newSelectedName = undefined;
            if (selectedName && (names[index].id === selectedName.id)) {
                newSelectedName = index === names.length - 1 ? names[0] : names[index + 1];
            } else {
                newSelectedName = names[index];
            }

            setSelectedName(newSelectedName);
        }
    }, [names, selectedName]);

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            if (e.key === "Enter" && currentInput.length > 0) {
                addName(currentInput);
            }
        };

        document.addEventListener('keydown', handler);

        return () => document.removeEventListener('keydown', handler);
    }, [currentInput]);

    return <div className="container pt-5">
        <h1 className={'mb-5'}>Names</h1>

        <div className='mb-4'>
            <TextField label={'Name'}
                       fullWidth
                       value={currentInput}
                       onChange={event => setCurrentInput(event.target.value)} />
        </div>

        <div className="row">
            <div className="col-md-4">
                <Button variant={'contained'}
                        color={'primary'}
                        onClick={() => addName(currentInput)}>Add name</Button>

                <Button variant={'contained'}
                        color={'secondary'}
                        className={'ml-3'}
                        onClick={pickName}>Pick name</Button>

            </div>
            <div className="col-md-8 text-right">
                {selectedName && <h1>{selectedName.name}</h1>}
            </div>
        </div>

        <NameList names={names} removeName={removeName} />
    </div>;

};

export default Names;