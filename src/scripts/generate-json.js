const inquirer = require("inquirer")
const commander = require("commander")
const path = require("path")
const fs = require("fs")
const glob = require("glob-promise")
const _ = require("lodash")

const program = new commander.Command()

program.version('0.0.1').parse(process.argv);

const dir = program.args[0];

(async () => {
  if (fs.existsSync(dir)) {
    const files = await glob(path.join(dir, '*.jpg'), {nocase: true})
    // const initialQuestions = inquirer.prompt([
    //   {
    //     type: 'input',
    //     name: 'jsonName',
    //     default: path.basename(dir)
    //   }
    // ])

    const jsonName = path.basename(dir)

    let json = []
    for (const file of files) {
      if (file.endsWith(".JPG")) {
        fs.renameSync(file, file.replace(/.JPG$/, '.jpg'))
      }
      const name = _.startCase(path.basename(file).replace('.jpg', ''))
      json = [
        ...json,
        {
          'imageURL': `/profiles/${jsonName}/${path.basename(file)}`,
          name
        }
      ]
    }

    const jsonPath = path.join(process.cwd(), `src/static/${jsonName}.json`)
    if (fs.existsSync(jsonPath)) {
      fs.unlinkSync(jsonPath)
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json))
  }
  else {
    console.log('Directory not found!')
  }
})()

