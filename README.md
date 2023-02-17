<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/polkahack/futarchy">
    <img src="https://www.polkadotglobalseries.com/wp-content/uploads/2022/12/KV-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Futurachy - Quickstart</h3>
  <p align="center">
    <a href="https://github.com/polkahack/futarchy">Futurachy</a> We're incentivising altruistic governance! </a>
    <br />
    Quickstart is a simplified version of Futurachy.
    <br />
    <br />
    <a href="https://youtu.be/3jcPzSFFWS4" name="demo">Guided-Quickstart Video</a>
    ·
    <a href="https://github.com/PolkaHack/futarchy/issues">Report Bug</a>
    ·
    <a href="https://github.com/polkahack/futarchy/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Screenshot">Screenshot</a></li>
        <li><a href="#Description">Description</a></li>
        <li><a href="#TLDR">TLDR</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#quick-start">Quickstart</a></li>
        <li><a href="#deep-dive">Deep Dive</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

### Screenshot

![screenshot](./screenshot.png)

### Description

We're incentivising altruistic governance!

This is a Quickstart of the Project [Futurachy](https://github.com/PolkaHack/futarchy).

Quickstart is a simplified version of the inner workings.

#### Summary

1. It spins up a Indexer, which graps the latest proposal from the Zeitgeist Chain.
2. It creates a graphQL endpoint.
3. It gets the Data through the GraphQL Endpoint.
4. It fetches the title from polkassembly based on the graphQL data.
5. It converts the title in question, description and slug.
6. It creates a market from question, description and slug.
7. The created Market created a market Id.
8. It converts converts marketId to a marketLink.
9. It posts a comment in [polkassembly](https://polkadot.polkassembly.io/) with a link to the newly created Market.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![NodeJs][nodejs]][nodejs-url]
[![Subsquid][subsquid]][subsquid-url]
[![Zeitgeist][zeitgeist]][zeitgeist-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow [README](https://github.com/PolkaHack/Things/blob/main/README.md) or Follow via [Video](https://youtu.be/ue22iS_N0MU).

### Quick Start

Terminal A
```sh
 cd ./00-squidServer
 npm install
 source .env
 npx sqd up
 npx sqd process 
```

Terminal B
```sh
cd ./00-squidServer
npx sqd server
```

Terminal C
```sh
npm install
mv ./env-example ./env
echo "seed=YOUR_SEED_WITH_ZTG_TOKENS_ON_BATERRY_TEST_NEXT" >> .env
node main.js
```

Output:  
[Screenshot](./screenshot.png)

### Deep Dive

1. check if `node` is installed. If not download it from [NodeJs.org][nodejs-url].

```sh
node --version
> v18.13.0
```

2. change directory to `./00-squidServer`

```sh
cd ./00-squidServer
```

3. rename `./env-example` to `./env`

```sh
mv ./env-example ./env
```

4. source your `./env`

```sh
source ./env
```

5. install packages, create `./node_modules` folder

```sh
npm install
```

6. set up subsquid indexer.

```sh
npx sqd up
npx sqd codegen
npx sqd migration:generate
```

7. run the mirgation process

```sh
npx sqd process
```

8. Amazing. This terminal will be block from now on. 
9. Open up a fresh new Terminal. In the new terminal navigate to the `./00-squidServer`
10. start the graphQL server

```sh
npx sqd serve
```

11. Got to [http://localhost:4350/graphql](http://localhost:4350/graphql)
12. Select or paste this query and run it.

```graphql
query MyQuery {
  proposals(limit: 1)
}
```

This is my current output, you will see a slidly diffrent output.
Because new proposal will come in daily.

<details>
<summary>Output</summary>
<pre>
{
  "data": {
    "proposals": [
      {
        "id": "0015438492-000039-c308a"
      }
    ]
  }
}
</pre>
</details>

13. Amazing. Now we have our indexer and our graphQL Server running. This terminal will be block from now on.
14. Open up a 3rd Terminal and navigate to the root folder.
15. run tree and you should see the following

```sh
tree -L 1
```

<details>
<summary>Output</summary>
<pre>
.
├── 00-squidServer
├── 01-getData
├── 02-createMarket
├── 03-postComment
├── README.md
├── main.js
├── package.json
├── screenshot.png

6 directories, 7 files
</pre>
</details>

16. Install packages

```sh
npm install
```

17. rename `./env-example` to `./env`

```sh
mv ./env-example ./env
```

18. paste seed in your Dev Account with Zeitgeist Token of the Battery Testnet into the `.env`

```sh
echo "seed=YOUR_SEED_WITH_ZTG_TOKENS_ON_BATERRY_TEST_NEXT" >> .env
```

19. source your `./env`

```sh
source ./env
```

20. run the main script.

```sh
node ./main.js
```

21. You see the following outcome.
<details>
  <summary>Output</summary>
<pre>
{
  body: '{"query":"query MyQuery {\\n  proposals(limit: 1) {\\n    proposalIndex\\n  }\\n}\\n","variables":null,"operationName":"MyQuery"}'
}
...getData()...
{
  question: 'Will proposal with Indes of 229 resolve?',
  description: '#229 Treasury Proposal: Polkawatch, Decentralization Analytics, Continued Operation and Development',
  slug: '#229 Treas',
  proposalIndex: 229
}
---------↓-----------
{
  question: 'Will proposal with Indes of 229 resolve?',
  description: '#229 Treasury Proposal: Polkawatch, Decentralization Analytics, Continued Operation and Development',
  slug: '#229 Treas',
  proposalIndex: 229
}
...createMarket()...
{
  proposalIndex: '229',
  comment: 'A prediction market is created.🗽 \n' +
    '\n' +
    'Go to [Zeitgeist App - Market Link](https://app.zeitgeist.pm/markets/234) \n' +
    '\n' +
    ' ⚠️ Currently only on the Battery-Testnet of Zeitgeist ⚠️ '
}
---------↓-----------
{
  proposalIndex: '229',
  comment: 'A prediction market is created.🗽 \n' +
    '\n' +
    'Go to [Zeitgeist App - Market Link](https://app.zeitgeist.pm/markets/234) \n' +
    '\n' +
    ' ⚠️ Currently only on the Battery-Testnet of Zeitgeist ⚠️ '
}
..postComment()...
{ status: 'true', link: 'https://polkadot.polkassembly.io/post/1617' }

</pre>
</details>

22. Lets look at the `./main.js` to see the actually code
    ```sh
    cat ./main.js
    ```

<details>
  <summary>Output</summary>
  <pre>
  import { getData } from "./01-getData/01-getData.js";
  import { createMarket } from "./02-createMarket/02-createMarket.js";
  import { postComment } from "./03-postComment/03-postComment.js";

async function main(dataInput) {
let resGetData = await getData(dataInput)
let resCreateMarket = await createMarket(resGetData)
let resPostComment = await postComment(resCreateMarket);
}

main({ body: "{\"query\":\"query MyQuery {\\n proposals(limit: 1) {\\n proposalIndex\\n }\\n}\\n\",\"variables\":null,\"operationName\":\"MyQuery\"}", })

  </pre>
</details>

<details>
<summary>Explainer</summary>
<ol>
<li>There is a main function</li>
<li>The main function runs 3 functions.</li>
<li>The main function runs each function one after the other. (async)</li>
<li>First getData() gets called. </li>
<li>getData() takes an input.</li>
<li>The input is a hardcoded stringfy version of our previously callded graphQL query.</li>
<li>The output of getData() gets stored in resGetData variable.</li>
<li>The second function is called createMarket(.</li>
<li>createMarket() gets called after getData() is executed.</li>
<li>createMarket takes the output of getData as an input.</li>
<li>The output of createMarket() gets stored in resCreateMarket variable.</li>
<li>The third function is called postComment()</li>
<li>postComment() gets called after createMarket() is executed.</li>
<li>postComment takes the output of createMarket() as an input.</li>
<li>The output of postComment() gets stored in resPostComment variable.</li>
<li>Thats the whole function declartion of main.js</li>
<li>the main function gets called after the declartion.</li>
<li>The main function takes a stringfy version of our graphQL query as an input.</li>
</ol>
</details>

<details>
<summary>TLDR</summary>
<ol>
<li>getData() fetches Data.</li>
<li>createMarket() creates a Market.</li>
<li>postComment posts a comment on Polkassembly.</li>
</ol>
</details>

23. Lets run our ./main.js again and break it down.

```sh
node ./main.js
```

24. Section 1 - Breakdown
<details>
<summary>Output - Section 1</summary>
<pre>
{
  body: '{"query":"query MyQuery {\\n  proposals(limit: 1) {\\n    proposalIndex\\n  }\\n}\\n","variables":null,"operationName":"MyQuery"}'
}
...getData()...
{
  question: 'Will proposal with Indes of 229 resolve?',
  description: '#229 Treasury Proposal: Polkawatch, Decentralization Analytics, Continued Operation and Development',
  slug: '#229 Treas',
  proposalIndex: 229
}
</pre>
</details>
<details>
<summary>Breakdown - Section 2 </summary>
<ol>
<li>Section 1 takes a graphQL Query as an Input</li>
<li>Runs getData().</li>
<li>It returns another Object.</li>
<li>The object has a question, description, slug, and a propsalIndex</li>
</ol>
</details>

25. Section 2 - Breakdown

<details>
<summary>Output - Section 2</summary> 
<pre>
{
  question: 'Will proposal with Indes of 229 resolve?',
  description: '#229 Treasury Proposal: Polkawatch, Decentralization Analytics, Continued Operation and Development',
  slug: '#229 Treas',
  proposalIndex: 229
}
...createMarket()...
{
  proposalIndex: '229',
  comment: 'A prediction market is created.🗽 \n' +
    '\n' +
    'Go to [Zeitgeist App - Market Link](https://app.zeitgeist.pm/markets/234) \n' +
    '\n' +
    ' ⚠️ Currently only on the Battery-Testnet of Zeitgeist ⚠️ '
}
</pre>
</details>
<details>
<summary>Breakdown - Section 2</summary>
<ol>
<li>Section 2 takes an object as an Input.</li>
<li>The Object contains a question, description, slug and a proposal Index.</li>
<li>Runs getData().</li>
<li>It returns another Object.</li>
<li>The object has a proposalIndex and a comment.</li>
</ol>
</details>

25. Section 3 - Breakdown

<details>
<summary>Output - Section 3</summary>
<pre>
{
  proposalIndex: '229',
  comment: 'A prediction market is created.🗽 \n' +
    '\n' +
    'Go to [Zeitgeist App - Market Link](https://app.zeitgeist.pm/markets/234) \n' +
    '\n' +
    ' ⚠️ Currently only on the Battery-Testnet of Zeitgeist ⚠️ '
}
..postComment()...
{ status: 'true', link: 'https://polkadot.polkassembly.io/post/1617' }
</pre>
</details>

<details>
<summary>Breakdown - Section 3</summary>
<ol>
<li>Section 3 takes an object as an Input.</li>
<li>The Object contains a proposalIndes and a comment.</li>
<li>Runs postComment().</li>
<li>Spit another Obeject out.</li>
<li>The object has a question, description, slug, and a propsalIndex.</li>
<ol>
</details>

26. This is the simplistic showcase of Futurachy.
27. If you are curious, take a look at each folder.

```sh
ls -la ./00-squidServer
```

```sh
ls -la ./01-getData
```

```sh
ls -la ./02-createMarket
```

```sh
ls -la ./03-postComment
```

28. The scripts are following the following convention.

```
|- DataInput
|- DataOutput
|- Function Declartion
|- Function Call
|- Export
```

<details>
<summary>The Code Convention</summary
<ol>
<li>Every script has a one specific purpose.</li>
<li>In MockInput / MockOutput you can see what each script takes as a argument.</li>
<li>The function declartion is the main section. It cointains the main logic.</li>
<li>The function call contains a running example of how to call it. By default its comment out.</li>
<li>The export section contains all exports.</li>
</ol>
</details>
    

30. Thanks for following along. : )

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Sergey Gerodes - [LinkedIn](https://www.linkedin.com/in/sgerodes/)  
K Gunjan - gunjan.cn@gmail.com - [LinkedIn](https://in.linkedin.com/in/gunjan321)  
Frank Bevr - frank_dierolf@web.de - Discord: `FrankBevr#9593`  
Morkeltry - @morkeltry - He will find you

Project Link: [Futurachy](https://github.com/polkahack/futarchy)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- [Massimo Luraschi](https://github.com/RaekwonIII) :heart:
- [Yornaath](https://github.com/yornaath) :heart:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/screenshot.png
[nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org
[zeitgeist]: https://img.shields.io/badge/Zeitgeist-Parachain-black?style=for-the-badge&logo=polkadot
[zeitgeist-url]: https://zeitgeist.pm/
[subsquid]: https://img.shields.io/badge/Subsquid-ChainIndexer-black?style=for-the-badge&logo=OctopusDeploy
[subsquid-url]: https://www.subsquid.io/
