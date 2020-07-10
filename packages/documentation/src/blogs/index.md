Title: react-md 2.0.3

Date: 07/07/2020

Summary:<!-- no-bullets -->

This release fixed a few styling issues for the #form package and correctly
passing the `disabled` prop to the `TextField`'s `<input>` element:

- **form:** Select disabled styling
  ([d79d007](https://github.com/mlaursen/react-md/commit/d79d0079307ccc735ebac0730d1d45aabe1419bd))
- **form:** TextArea disabled styles
  ([ef118bf](https://github.com/mlaursen/react-md/commit/ef118bf325e68e9ae8c988f9f93a1e19e1468084))
- **form:** TextField and Select disabled behavior
  ([e8f2c57](https://github.com/mlaursen/react-md/commit/e8f2c579a1ee502674bfddbcc10713d4b50d7cc4))

---

Title: react-md 2.0.2

Date: 06/30/2020

Read More: #877

Summary:<!-- no-bullets -->

This release focused on fixing bundle sizes with webpack as well as increasing
build performance with the `sideEffects` field for each `package.json`. For more
information, check out the v2.0.2 release PR #877 which goes into details about
build time and sizing changes.

This release also includes the following changes:

- **LICENSE:** Removed the time range from license since it was incorrect
  (50c9021)
- Added unpkg url for base react-md package (d0efc59)
- Updated the changelogs to be updated by
  [conventional commits](https://www.conventionalcommits.org/) which allows for
  a combined root [CHANGELOG.md]({{GITHUB_FILE_URL}}/CHANGELOG.md) (46f4e26)

---

Title: react-md 2.0.1

Date: 06/17/2020

Summary:<!-- no-bullets -->

This is _technically_ a breaking change for the UMD bundle since this splits the
material-icon component wrappers into separate bundles to minimize the library's
size. I'm going with a patch bump though since it's only been two days since the
v2 release and it's highly doubtful that consumers of the library have fully
upgraded to v2 or even using the UMD bundle to begin with.

react-md will now be available as these bundles:

- Base `ReactMD` library:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md.production.min.js
- `ReactMD` with `*FontIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-font-icons.production.min.js
- `ReactMD` with `*SVGIcon` components:<br />
  https://unpkg.com/react-md@2.0.1/dist/umd/react-md-with-svg-icons.production.min.js

The
[advanced installation guide](/guides/advanced-installation#react-md--material-icons-umd-bundle)
and the [library size notes](/about#what39s-the-library-size) have been updated
for this information.

---

Title: react-md 2.0.0

Date: 06/15/2020

Read More: v2-release

Summary:

The v2 release is a complete re-write of react-md to address the majority of
problems encountered while using v1. Unfortunately, this took a **lot** longer
than I had hoped since I ended up using this project to learn
[Typescript](https://www.typescriptlang.org/) as well as the new
[React hooks API](https://reactjs.org/docs/hooks-intro.html). Even though there
are some missing components from v1, I think the new functionality outweighs it
and the components are scoped for a later release.

The 2.0.0 release of react-md features:

- Rewrite to Typescript
- New Behavior for Determining the Current Application Size
- New Theme API
- New Utility SCSS Functions and Mixins
- SCSS Variables and Default Values in JavaScript
- Automatic Color fixes for Accessible Contrast Ratios
- Improved Typography and CSS Reset
- Improved User Interaction States
- Improved Accessibility and Keyboard Movement
- Right to left Language Support
- Convenience Configuration and Context Provider Components
- Around 50 new Components and 40 hooks
- All Material Icons Available as Components
- Scoped Packages
- New Documentation Site