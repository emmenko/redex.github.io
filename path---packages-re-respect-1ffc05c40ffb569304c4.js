webpackJsonp([0x8c1c68f005cb],{1058:function(e,t){e.exports={data:{package:{id:"re-respect",score:.6169705134418723,name:"re-respect",version:"0.4.3",description:"[![Build Status](https://travis-ci.org/PeteProgrammer/respect.svg?branch=master)](https://travis-ci.org/PeteProgrammer/respect)",keywords:["bucklescript","testing","bdd"],license:"MIT",updated:"2017-12-21T11:59:43.498Z",stars:11,type:"published",quality:.8231393284136458,popularity:.057224899765081744,maintenance:.9999999999999999,readme:'<h1>ReSpect</h1>\n<p><a href="https://travis-ci.org/PeteProgrammer/respect"><img src="https://travis-ci.org/PeteProgrammer/respect.svg?branch=master" alt="Build Status"></a></p>\n<p>This is an RSpec inspired test framework for ReasonML/OCaml/Bucklescript. The\nrunner uses raw javascript code, so it will only run in node environments at the moment.</p>\n<p>I base this on a lot of experience I gained from a similar project for F#, FSpec.</p>\n<p>This project is still in a very early stage, so use at your own risk.</p>\n<h2>Latest changes</h2>\n<h3>0.4.0 - 0.4.3</h3>\n<ul>\n<li>Added <code>Ctx.tryGet</code> - Returns <code>None</code> if no entry with the specified key exists\nin the context data.</li>\n<li>Added Respect.Ctx module as alias for TestContext</li>\n<li>TestContext.don function to help accept a done callback from setup functions</li>\n<li>Refactor: Test context is now represented by an object instead of a mutable\nrecord. But the TestContext module still has functions for operating on the\nactual context, so existing code should be compatible.</li>\n<li>Testcontext subject: The subject is a function that evaluates to an actual\nvalue when requested. The function receives the test context as input. You\ncan assign the subject in a parent group, and modify the context in a child\ngroup.</li>\n<li>TextContext.map: Allows you to easily modify objects in the context.</li>\n</ul>\n<h3>0.3.0</h3>\n<ul>\n<li>Breaking change: In order to get better error messages when match fails, the\nMatchFailure constructor now takes two args, the actual object, and the\nexpected object of the failed matcher.</li>\n</ul>\n<p>Previously when testing async code, I could get messages like this</p>\n<pre><code>Expected: [ ["john.doe@example.com"], ...]\nActual: [ [Function] ]\n</code></pre>\n<p>Which wasn\'t helpful in finding the bug.</p>\n<h2>TODO</h2>\n<ul>\n<li>"Finalize" DSL for building test suites.</li>\n<li>Determine whether or not to allow mutation of <code>TestContext</code>. This worked well\nin F#/FSpec, but we don\'t have runtime type checking in Reason/Bucklescript.</li>\n<li>Finalize assertion framework.</li>\n<li>Nicer test output when running.</li>\n<li>Nicer test output when assertions fail.</li>\n<li>Internally, figure out how to report progresss.</li>\n<li>More flexible runner, e.g. configurable location of test files</li>\n<li>✓ Handle async timeout to avoid hanging when async tests don\'t call back</li>\n<li>Make timeout configurable through example metadata.</li>\n</ul>\n<p>Although, I had learned from many mistakes when building FSpec, there are some\nproblems that demand different solutions in Reason/Bucklescript. Async support\nin particular.</p>\n<h2>Installation</h2>\n<p>This guide will help you get <code>Respect</code> and having a test-watcher setup.\n<em>Respect</em> in itself does not implement test-watcher functionality, but it is\neasily added with the <em>nodemon</em> package.</p>\n<h3>Basic installation</h3>\n<p>First, add <em>respect</em>, the npm package is named "re-respect"</p>\n<pre><code>npm install --save-dev re-respect\n</code></pre>\n<p>As this is a package with Reason code, you need to add a reference to the\npackage in the <em>bsconfig.json</em> file, as well.</p>\n<p>You also need to add a <em>tests</em> folder to contain the tests. At this early time\nof writing, the only place that Respect searches for tests files is in the\n<em>tests</em> folder, so be sure that is the exact name of the folder.</p>\n<pre><code>"files": [\n  {"dir": "src"},\n  {"dir": "tests",\n   "type": "dev" }\n],\n"bs-dev-dependencies": [\n  "re-respect"\n]\n</code></pre>\n<p>Create a skeleton test, "./tests/tests.re":</p>\n<pre><code>open Respect.Dsl;\n\ndescribe "My first test" [\n  it "runs" (fun _ => {()})\n] |> register\n</code></pre>\n<p>The <code>register</code> call is necessary at this early stage, it adds the specs to one\nglobal test group.</p>\n<p>Now, let\'s add a test target to <em>package.json</em></p>\n<pre><code>"scripts": {\n   ...\n   "test": "respect"\n}\n</code></pre>\n<p>And now, you can run the tests with <code>npm run test</code></p>\n<h3>Adding test watcher functionality</h3>\n<p>The npm package <em>nodemon</em> can trigger running <em>.js</em> files when the file system\nchanges. We can use this to implement filesystem watcher functionality. First\ninstall the package</p>\n<pre><code>npm install --save-dev nodemon\n</code></pre>\n<p>And then add a script to the <em>package.json</em> file</p>\n<pre><code>  "scripts": {\n    ...\n    "test:watch": "nodemon node_modules/re-respect/bin/respect"\n  }\n</code></pre>\n<p>And now, you can have the tests run automatically when a <em>.js</em> file changes\nwith the command <code>npm run test:watch</code>. Of course, when you edit reason source\nfiles, that will not trigger a test run, so you need to run <code>npm run watch</code> in a\ndifferent terminal.</p>\n<h3>Optionally, create a <em>dev</em> task</h3>\n<p>In the previous section, you had to run two watchers in two separate terminals\nin order to have full watcher implementation. We can create an npm script that\ndoes both of these tasks with the help of the npm package <em>npm-run-all</em>, which\nallows parallel execution of multiple scripts.</p>\n<pre><code>npm install --save-dev npm-run-all\n</code></pre>\n<p>In the <em>package.json</em> file, add a new script:</p>\n<pre><code>  "scripts": {\n    ...\n    "dev": "run-p watch test:watch"\n  }\n</code></pre>\n<p>The command <code>run-p</code> is part of <em>npm-run-all</em>, and it runs the two scripts in\nparallel.</p>\n<p>Now you can run <code>npm run dev</code> in one terminal, and it will compile reason files,\nand run tests, as files are written on disk.</p>\n<h2>Syntax</h2>\n<p>Instead of using mutating nested function calls, <em>Respect</em> uses immutable data\nstructures for building up the test context and tests. Therefore, the\n<code>desribe</code>-operation takes nested operations in a list.</p>\n<pre><code>register(\n  describe "Parent context" [\n    it "has some test" (fun _ =>\n      ...\n    )\n    it "has some test" (fun _ =>\n      ...\n    )\n\n    describe "Child context" [\n      it "has more tests" (fun _ =>\n        ...\n      )\n    ]\n  ])\n</code></pre>\n<p>The only mutating construct here is the function <code>register</code> which adds the group\nof examples to an implicit root group.</p>\n<h3>Pending tests</h3>\n<p>Often it is useful to write pending tests, small skeleton desrciptions of\nfunctionality you need to implement. This can turn the test framework into a\nsmall todo list:</p>\n<pre><code>describe("Register user", [\n  pending("Returns Ok(user) if registration succeeded"),\n  pending("Returns Error(DuplicateEmail) if email already registered"),\n]) |> register\n</code></pre>\n<p>Pending tests will not result in failure when running the tests.</p>\n<h2>Async tests</h2>\n<p>Async support is currently best implemented by opening <code>Respect.Dsl.Async</code>.</p>\n<p>I believe that this will be in time be the the only "official" Dsl to end with,\nbut maybe with helper functions to write sync examples if you need to.</p>\n<pre><code>open Respect.Dsl.Async;\n\ndescribe "Parent context" [\n  it "has an async test" (fun _ don => {\n    if (success) {\n      don ();\n    }else {\n      don err::"Error" ();\n    }\n  })\n] |> register;\n</code></pre>\n<p>There is currently async matcher support through the function <code>shoulda</code>\n(should-async). The function has the signature:</p>\n<pre><code>(matcher : matcher \'a \'b) => (actual : \'a) => (cb : doneCallback) => unit\n</code></pre>\n<p>This signature plays nicely with the callback allowing you to write tests like\nthis:</p>\n<pre><code>describe "Register User" [\n  describe "Posting valid user" [\n    it "creates a user" (fun _ => {\n      createValidInput ()\n        |> UserFeature.registerUser\n        |> shoulda asyncSucceed\n    })\n  ]\n] |> register\n</code></pre>\n<p>This is a bit cryptic but I\'ll try to explain</p>\n<ul>\n<li>Our test function didn\'t explicitly specify a done callback</li>\n<li>We didn\'t pass a done callback to to the <code>shoulda</code> function either. This makes\nthe result of the <code>shoulda</code> function another function, which takes a done\ncallback.</li>\n<li>So the result of our test function is the function returned by <code>should</code>, the\none that takes done callback. Thus our test function has the exact shape that <code>it</code> expects.</li>\n<li>The <code>registerUser</code> is an async function that expects a callback that we didn\'t supply.</li>\n<li>The asyncSucceed takes an async function as argument and supplies the right\ncallback that binds it to the done callback.</li>\n</ul>\n<p>This doesn\'t play nice however, if you want to have multiple assertions in the\nsame test :(</p>\n<p>It will come.</p>\n<p>Please be aware that the matcher syntax is likely to change, but I will try\nto keep backward compatibility by moving alternate matcher framework into separate\nmodules.</p>\n<h2>Matchers (breaking change in version 0.2)</h2>\n<p>The matchers framework is based on these types:</p>\n<pre><code>type matchResult(\'t) =\n  | MatchSuccess(\'t)\n  | MatchFailure(Obj.t);\n\ntype matcher(\'a, \'b) = \'a => (matchResult(\'b) => unit) => unit;\n\nexception MatchFailedException(string);\n</code></pre>\n<p>So a matcher takes an actual value and provides a matchresult asyncrounously\nthrough a callback. Matchers that evaluate synchronously can use these helper\nfunctions</p>\n<pre><code>let matchSuccess = (a) => cb => cb(MatchSuccess(a));\nlet matchFailure = (a) => cb => cb(MatchFailure(a |> Obj.repr));\n</code></pre>\n<p>So if we look at the <code>equal</code> match constructor:</p>\n<pre><code>let equal = (expected, actual) =>\n  actual == expected ? matchSuccess(actual) : matchFailure(expected);\n</code></pre>\n<p>So it takes an expected value and returns a matcher based on this.</p>\n<h2>Test Metadata</h2>\n<p>You can add metadata to a group or an example. And if you have metadata on a\nparent group, you can override it in a child group. The metadata is added using\nthe strange looking <em>**></em> operator (I chose this because the <em>*</em> makes it right\nassociative, which I need in order to avoid parenthesis hell, and the <em>></em> helps\nindicating that the metadata binds to the group/example to come.</p>\n<p>The interesting thing is that the metadata is initialized before the example\nstarts executing, which means that metadata specified on an example can effect\nthe setup code executed in a parent group. The following example shows how:</p>\n<pre><code>open Respect.Dsl.Async;\n\ndescribe "Register user" [\n  beforeEach (fun ctx don => {\n    ctx |> TestContext.get "userName"\n    |> /* do something interesting with the user */\n    don()\n  }),\n\n  ("userName", "johndoe") **>\n  describe "A valid user name was entered" [\n    it "Correctly registers the user" (fun ctx don => {\n       ...\n       don\n    })\n  ],\n\n  ("userName", "!@#$") **>\n  describe "An invalid user name was entered" [\n    it "Returns a sensible error message" (fun ctx don => {\n       ...\n       don ()\n    })\n  ]\n] |> register\n</code></pre>\n<h3>Composing Matchers</h3>\n<p>Matchers can be composed using the "fish" operator <code>>=></code>, so a <code>matcher \'a \'b</code>\ncan be composed with a <code>matcher \'b \'c</code> into a <code>matcher \'a \'c</code>.</p>\n<p>This can be particularly useful when the value passed with the success is\ndifferent from the actual value passed to the matcher. Here is an example from a\npiece of production code I am working on:</p>\n<pre><code>/* General types to handle errors and async code */\ntype result \'a \'b =\n  | Ok \'a\n  | Error \'b;\ntype async \'a = (\'a => unit) => unit;\ntype asyncResult \'a \'b = async (result \'a \'b);\n\n/* Specific error types returned by repository layer */\ntype databaseError \'id =\n| DocumentNotFound string \'id\n| MongoErr MongoError.t;\n\n/* This is a matcher that verifies that an async function fails. "actual" is a\nfunction that takes a result callback */\nlet asyncFail actual => {\n  AsyncMatchResult (fun cb => {\n    actual\n      |> AsyncResult.run (fun\n      | Error y => cb (MatchSuccess y)\n      | Ok y => cb (MatchFailure (Obj.repr y)));\n      });\n};\n</code></pre>\n<p>The interesting thing is that the <code>asyncFail</code> matcher passes the error to the\n<code>MatchResult</code> constructor, to be used by a new matcher. In this tests we compose\nit with a new matcher that verifies that we actually get the expected error.</p>\n<pre><code>describe "UserRepository" [\n    describe "findById" [\n      describe "record doesn\'t exist" [\n        it "returns DocumentNotFound" (fun _ => {\n          let id = "dummy";\n          UserRepository.getById id\n            |> shoulda (UserFeature_test.asyncFail >=> (equal (DocumentNotFound "users" id)))\n        })\n      ]\n    ]\n  ],\n] |> register;\n</code></pre>\n<p>The operator supports combining sync and async matchers as you like - but they\nare not properly tested in the framework. Only the above case async>=>sync\nmatcher has been tested in the wild.</p>\n',homepageUrl:"https://github.com/PeteProgrammer/respect#readme",repositoryUrl:"https://github.com/PeteProgrammer/respect",npmUrl:"https://www.npmjs.com/package/re-respect",issuesUrl:"https://github.com/PeteProgrammer/respect/issues",slug:"packages/re-respect"}},pathContext:{id:"re-respect"}}}});
//# sourceMappingURL=path---packages-re-respect-1ffc05c40ffb569304c4.js.map