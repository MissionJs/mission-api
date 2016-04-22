import {argv} from 'yargs';
import * as util from 'gulp-util';
import {TableBO} from '../../utils/project/tableBO';
import {Generator} from '../../utils/project/generator';
import {BOFactory} from '../../../src/bo';
import {MODEL_TEMPLDATE_FILE, GEN_CODE_MODEL_DIR} from '../../config';
import {List} from 'linqts';

export = (): void => {
    if (!argv.tablename && !argv.all && !argv.list) {
        util.log(DisplayHelp());
        return;
    }
    var tableDetailsBo = BOFactory.CreateBO(TableBO);
    tableDetailsBo
        .GetAllColumnDetails()
        .then((columns) => {
            if (argv.all) {
                if (argv.log) {
                    util.log(columns);
                }
                Generator.GenerateMulitple(MODEL_TEMPLDATE_FILE, GEN_CODE_MODEL_DIR, columns.ToArray(), 'Name', 'Dto.ts');
            } else if (argv.tablename) {
                let tableName = <string>argv.tablename;
                let data = columns.Where(x => x.Name.toLowerCase() === tableName.toLowerCase());
                Generator.Generate(MODEL_TEMPLDATE_FILE, GEN_CODE_MODEL_DIR, data.ToArray(), data.First().Name, 'Dto.ts');
            } else if (argv.list) {
                let tables = columns
                    .Select(x => x.Name)
                    .ToArray();
                let list = new List<string>(tables).GroupBy(x => x, x => null);
                util.log(list);
            }
        });
};

function DisplayHelp(): string {
    return `
usage
gulp gen.model --tablename <tablename>  # to generate model class for a table
gulp gen.model --all                    # to generage model class for all table
gulp gen.model --list                   # to list all available tables    
gulp gen.model --help                   # to view help
gulp gen.model <action> --log           # to view the logs
`;
}

