import {Enum} from 'enumify';

class ActionType extends Enum {}
ActionType.initEnum(['Create', 'Edit', 'Delete']);
export default ActionType
