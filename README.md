# Dental Fee Table

Dental Fee Table turns a practice's approved fee file into a readable website page. It preserves exact fees, from prices and ranges, with notes and the supplied review date kept close to the information they explain.

The practice remains responsible for its prices and wording. This tool does not recommend treatment or assess regulatory compliance. Maintained by [Dentist Web Design](https://dentistwebdesign.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply practice, currency (GBP) and fees: id, category, label, price_type (exact/from/range/quote), reviewed_on and approved_note. exact/from require amount; range requires min_amount and max_amount. Amounts are decimal strings.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

Flat collections can also be imported with `--csv data.csv --context context.json --key items` (replace `items` with the documented collection). Nested structures use JSON. See `node cli.mjs --help`.

## Worked example

Use a clearly labelled fictional practice with Service A at an exact sample fee, Service B as a range, Service C from an amount and Service D quoted after discussion. Values are test data, not guidance on real dental prices. Include a malformed reversed range and a missing review date in failing fixtures.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- Every price type has valid required fields; reversed ranges and mixed currencies fail clearly.
- Amounts use integer minor units or validated decimal strings. No floating-point rounding changes the approved fee.
- Notes and supplied review dates survive import, rendering and print output without substitution.
- At 320 px and large text sizes, fees stay associated with the correct labels and headings remain logical.
- Markup injection, malformed CSV and formula-like spreadsheet values are handled safely. No uploaded data leaves the local tool.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/Dentist-Web-Design/dental-fee-table/issues) for a reproducible bug and [Discussions](https://github.com/Dentist-Web-Design/dental-fee-table/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.

## CSV example

```sh
node cli.mjs --csv examples/input.csv --context examples/context.json --key fees --format html --output csv-report.html
```

The context holds the root settings; the CSV holds the flat collection. Explicit booleans use `true` or `false`. Nested data uses JSON.
