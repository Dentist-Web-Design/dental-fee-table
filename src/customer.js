import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Dental Fee List Builder",
  "short": "Make your practice fees easier to read",
  "audience": "For dental practice managers",
  "summary": "Prepare a clear fee list using your practice’s approved prices, price ranges and notes.",
  "button": "Create my fee list",
  "filename": "dental-fee-list",
  "eyebrow": "Clear information. Thoughtfully presented.",
  "time": "Start with one fee",
  "outcome": "A readable fee list for internal approval or your website supplier.",
  "layout": "clinical",
  "intro": "Add your own approved fees. Choose whether each fee is exact, starts from an amount, is a range, or is quoted individually.",
  "note": "This formats information you supply. It does not set fees, recommend treatment or verify clinical and regulatory wording.",
  "fields": [
    {
      "id": "business",
      "label": "Practice name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "reviewed",
      "label": "Date these fees were approved",
      "help": "Use the practice’s actual approval date.",
      "type": "date",
      "required": true
    },
    {
      "id": "notes",
      "label": "Practice-approved introduction",
      "help": "Optional. For example, explain when a written estimate is provided.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "repeat": {
    "itemLabel": "Fee",
    "max": 40,
    "fields": [
      {
        "id": "name",
        "label": "Treatment or service",
        "help": "",
        "required": true,
        "type": "text",
        "maxLength": 180
      },
      {
        "id": "kind",
        "label": "How is this fee shown?",
        "options": [
          [
            "exact",
            "Exact fee"
          ],
          [
            "from",
            "From a fee"
          ],
          [
            "range",
            "Price range"
          ],
          [
            "quote",
            "Quoted individually"
          ]
        ],
        "help": "",
        "required": true,
        "type": "select"
      },
      {
        "id": "price",
        "label": "Fee / lower amount (£)",
        "help": "In pounds, for example 4.50. Do not include the £ sign.",
        "required": true,
        "type": "text",
        "maxLength": 180,
        "inputmode": "decimal",
        "when": {
          "field": "kind",
          "values": [
            "exact",
            "from",
            "range"
          ]
        }
      },
      {
        "id": "upper",
        "label": "Upper amount (£)",
        "help": "In pounds, for example 4.50. Do not include the £ sign.",
        "required": true,
        "type": "text",
        "maxLength": 180,
        "inputmode": "decimal",
        "when": {
          "field": "kind",
          "values": [
            "range"
          ]
        }
      },
      {
        "id": "note",
        "label": "Approved note",
        "help": "Optional. Explain what the fee covers using approved wording.",
        "required": false,
        "type": "textarea",
        "maxLength": 2500,
        "wide": true
      }
    ]
  },
  "example": {
    "business": "Example Dental Practice",
    "reviewed": "2026-10-01",
    "notes": "Illustrative fees for this example only. Individual treatment is discussed with the practice.",
    "rows": [
      {
        "name": "Routine examination",
        "kind": "exact",
        "price": "55.00",
        "note": "Example fee only."
      },
      {
        "name": "Restorative treatment",
        "kind": "from",
        "price": "120",
        "note": "Example wording for practice review."
      },
      {
        "name": "Complex treatment",
        "kind": "quote",
        "note": "Written estimate after assessment."
      }
    ]
  }
};
export function evaluate(v){const name=requireText(v.business,'your practice name');if(!/^\d{4}-\d{2}-\d{2}$/.test(v.reviewed)||!Number.isFinite(Date.parse(v.reviewed+'T00:00:00Z'))||new Date(v.reviewed+'T00:00:00Z').toISOString().slice(0,10)!==v.reviewed)throw Error('Choose a valid approval date.');if(v.reviewed>new Date().toISOString().slice(0,10))throw Error('Use an approval date that has already happened.');if(!v.rows?.length||v.rows.length>40)throw Error('Add between 1 and 40 fees.');const fees=v.rows.map((i,n)=>{enumValue(i.kind,['exact','from','range','quote'],'how fee '+(n+1)+' is shown');let amount='Quoted individually';if(i.kind!=='quote'){const a=pence(i.price);amount=(i.kind==='from'?'From ':'')+pounds(a);if(i.kind==='range'){const b=pence(i.upper,'the upper amount');if(b<a)throw Error('The upper amount must be at least the lower amount.');amount+=' to '+pounds(b);}}return {name:requireText(i.name,'a treatment or service name'),price:amount,note:clean(i.note)};});return report(name+': fee list',clean(v.notes)||'Prepared from fees supplied by the practice.',[section('Approval record',['Fees approved: '+v.reviewed,'Check that these remain current and that every description and note is approved before publication.'])],{fees});}
