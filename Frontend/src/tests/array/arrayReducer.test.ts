import { Array } from '../../application/dataStructures/Array';
import { IArrayState } from '../../application/providers/ArrayProvider';
import {
  ArrayMethod,
  arrayReducer,
} from '../../application/reducers/arrayReducer';
import { ArrayIcon } from '../../application/assets/icons/Icons';
import { ARRAY_DESCRIPTION } from '../../application/utils/constants';

describe('initialState', () => {
  let array: Array<string>;
  let previousState: IArrayState;

  beforeEach(() => {
    array = new Array<string>();
    array.values = ['a', 'b', 'c'];
    previousState = {
      data: array,
      paint: { type: ArrayMethod.Remove },
      icon: ArrayIcon,
      description: ARRAY_DESCRIPTION,
    };
  });

  it('sets the first value ', () => {
    const { data, paint } = arrayReducer(previousState, {
      type: ArrayMethod.Set,
      payload: { index: 0, value: 'd' },
    });
    expect(data.values[0]).toBe('d');
    expect(paint).toEqual({ type: ArrayMethod.Set, index: 0 });
  });

  it('sets a value ', () => {
    const { data, paint } = arrayReducer(previousState, {
      type: ArrayMethod.Set,
      payload: { index: 1, value: 'd' },
    });
    expect(data.values).toContain('d');
    expect(paint).toEqual({ type: ArrayMethod.Set, index: 1 });
  });

  it('sets the last value ', () => {
    const { data, paint } = arrayReducer(previousState, {
      type: ArrayMethod.Set,
      payload: { index: array.values.length - 1, value: 'd' },
    });
    expect(data.values[array.values.length - 1]).toBe('d');
    expect(paint).toEqual({
      type: ArrayMethod.Set,
      index: array.values.length - 1,
    });
  });
});
