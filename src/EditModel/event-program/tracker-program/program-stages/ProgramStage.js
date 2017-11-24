import React, { Component } from 'react';
import DataTable from 'd2-ui/lib/data-table/DataTable.component';
import programStore$ from '../../eventProgramStore';
import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';
import mapPropsStream from 'recompose/mapPropsStream';
import { get, noop, first, getOr, __ } from 'lodash/fp';
import {
    getTableColumnsForType,
    getFilterFieldsForType,
    getFiltersForType
} from '../../../../config/maintenance-models';
import withState from 'recompose/withState';
import FloatingActionButton from 'material-ui/FloatingActionButton/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import { addQuery } from '../../../../router-utils';
import ProgramStageList from './ProgramStageList';
import EditProgramStage from './EditProgramStage';

const program$ = programStore$.map(get('program'));
const programStages$ = programStore$.map(get('programStages'));



const enhance = compose(
    mapPropsStream(props$ =>
        props$.combineLatest(
            program$,
            programStages$,
            (props, program, programStages) => ({
                ...props,
                program,
                programStages
            })
        )
    ),
    withState('tableColumns', 'setTableColumns', getTableColumnsForType('programStage'))
);

const handleNewProgramStage = () => {
    addQuery({stage: 'new'})
}

const FAB = (props) => {
    const cssStyles = {
        textAlign: 'right',
        marginTop: '1rem',
        bottom: '1.5rem',
        right: '1.5rem',
        position: 'fixed',
        zIndex: 10
    };

    return (
        <div style={cssStyles}>
            <FloatingActionButton onClick={handleNewProgramStage}>
                <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
        </div>
    )
}

const shouldRenderStageEdit = location => {
    return location && location.query && location.query.stage;
}



const ProgramStage = (props) => {

    return (<div>
        { shouldRenderStageEdit(props.location) ? <EditProgramStage/> : <ProgramStageList/> }
    </div>);
};

export default ProgramStage;
