import {Enum} from 'enumify';

class SortMode extends Enum {}
SortMode.initEnum(['voteScore', 'timestamp']);
export default SortMode
