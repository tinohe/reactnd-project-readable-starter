import {Enum} from 'enumify';

class EntityType extends Enum {}
EntityType.initEnum(['Post', 'Comment']);
export default EntityType
