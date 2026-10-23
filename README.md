# Dental Fee List Builder

Prepare a clear fee list using your practice’s approved prices, price ranges and notes.

**For dental practice managers. No coding knowledge needed.**

[Open the free tool](https://dentist-web-design.github.io/dental-fee-table/) · [See a fictional worked example](https://dentist-web-design.github.io/dental-fee-table/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Create my fee list** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A readable fee list for internal approval or your website supplier.

## What to expect

Add your own approved fees. Choose whether each fee is exact, starts from an amount, is a range, or is quoted individually.

This formats information you supply. It does not set fees, recommend treatment or verify clinical and regulatory wording.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Dentist Web Design](https://dentistwebdesign.uk/). The tool is maintained by Dentist Web Design, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Dentist-Web-Design/dental-fee-table/discussions/1).
