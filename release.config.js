module.exports = {
	branches: ["dev"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		[
			"@semantic-release/changelog",
			{
				changelogFile: "./CHANGELOG.md",
			},
		],
		"@semantic-release/git",
		"@semantic-release/github",
	],
	dryRun: false,
	repositoryUrl: "https://github.com/Clement-Muth/deazl.git",
};
