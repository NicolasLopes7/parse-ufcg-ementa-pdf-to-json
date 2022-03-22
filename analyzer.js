const ementas = require('./ementas.json');
const fs = require('fs');
const schema = {
  'COMPONENTE CURRICULAR:': 'name',
  'CARGA HORÁRIA:': 'hours',
  'PRÉ-REQUISITO:': 'preRequisites',
  'UNIDADE ACADÊMICA RESPONSÁVEL:': 'owner',
  'EMENTA:': 'ementa',
  'BIBLIOGRAFIA BÁSICA:': 'bibliography',
  'BIBLIOGRAFIA COMPLEMENTAR:': 'bibliography',
};

const createBaseObject = () => {
  const obj = {};
  Object.values(schema).forEach((field) => (obj[field] = ''));
  return obj;
};

const getPropertyName = (currentFieldIdx) => schema[fields[currentFieldIdx]];

const fields = Object.keys(schema);

const materias = [];

let idx = -1;
let currentFieldIdx = 0;
ementas.Pages.forEach((page) => {
  page.Texts.forEach(({ R: [{ T }] }) => {
    const text = decodeURIComponent(T).trim();
    if (fields.includes(text)) {
      currentFieldIdx = fields.findIndex((field) => field === text);
      if (currentFieldIdx === 0) {
        materias.push(createBaseObject());
        idx = materias.length - 1;
      }
      return;
    }

    if (idx === -1) return;

    materias[idx][getPropertyName(currentFieldIdx)] += text;
  });
});

fs.writeFileSync('output.json', JSON.stringify(materias, null, 2));
