import { ILayoutState } from '../providers/LayoutProvider';

export enum LayoutActionType {
  UpdatePageIdx,
}

interface UpdatePageIdx {
  type: LayoutActionType.UpdatePageIdx;
  payload: number;
}

export type LayoutActions = UpdatePageIdx;

export const layoutReducer = (
  state: ILayoutState,
  action: LayoutActions
): ILayoutState => {
  switch (action.type) {
    case LayoutActionType.UpdatePageIdx:
      return { ...state, pageIdx: action.payload };
    default:
      return state;
  }
};
