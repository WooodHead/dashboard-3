import React, { Component } from 'react';
import GitCommitInfoGeneric from '../../../common/GitCommitInfoGeneric';

export interface Data {
    author: string;
    date: string;
    gitUrl: string;
    header: string;
    sourceBranchName: string;
    sourceCheckout: string;
    targetBranchName: string;
    targetCheckout: string;
}

export interface WebhookData {
    id: number;
    eventActionType: string;
    data: Data
}

export interface CommitHistory {
    author: string;
    commitURL: string;
    changes: string[];
    commit: string;
    date: string;
    message: string;
    isSelected: boolean;
    showChanges: boolean;
    webhookData: WebhookData
}

export interface CIMaterialType {
    id: number;
    gitMaterialName: string;
    gitMaterialId: number;
    gitURL: string;
    type: string;
    value: string;
    active: boolean;
    history: CommitHistory[];
    isSelected: boolean;
    lastFetchTime: string;
    isRepoError?: boolean;
    repoErrorMsg?: string;
    isBranchError?: boolean;
    branchErrorMsg?: string;
    isMaterialLoading?: boolean;
}

export interface MaterialHistoryProps {
    material: CIMaterialType;
    pipelineName: string;
    selectCommit?: (materialId: string, commit: string) => void;
    toggleChanges: (materialId: string, commit: string) => void;
}

export class MaterialHistory extends Component<MaterialHistoryProps> {

    render() {
        return <>
            {this.props.material.history.map((history) => {
                let classes = `material-history ${history.isSelected ? 'material-history-selected' : ''}`;
                if (this.props.selectCommit) {
                    classes = `${classes} cursor`;
                }
                return <div key={history.commit} className={classes} onClick={(e) => {
                    e.stopPropagation();
                    if (this.props.selectCommit)
                        this.props.selectCommit(this.props.material.id.toString(), history.commit);
                }}>
                    <GitCommitInfoGeneric
                        materialUrl={""}
                        showMaterialInfo={false}
                        commitInfo={history}
                        materialSourceType={this.props.material.type}
                        selectedCommitInfo={this.props.selectCommit}
                        materialSourceValue={this.props.material.value}

                    />
                </div>
            })}
        </>
    }
}