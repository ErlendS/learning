## Useful things


### iTerm commands
```
# change directory
cd [path]
eg: cd ./testingNode

# view directory contents
ls [path] (path is optional, defaults to .)
eg. ls
useful flags: -l (list), -a (all)
eg. ls -al ./testingNode

# run file in node
node ./testingNode/index.js
```

### Git

#### Committing changes
```
# view list of files changed since last commit
git status

# view changes
git diff

# add file to be committed
git add [path]
eg: git add testingNode/index.js

# remove a deleted file from git (and save that it was deleted in a commit)
git rm [path]

# remove an accidentally added (git add) file
git reset [path to accidentally added file]
eg. git reset .gitignore

# commit files and changes added, then push to GitHub
git commit -m "This is the commit message"
git push

# pull files from github
git pull

# stage all modified files for commit and add commit message
git commit -am ""

```

#### Reverting changes
```
# revert changes in a file
git checkout [path]
eg: git checkout testingNode/index.js

# reset all changes since last commit (no way back)
git reset --hard

# go back to previous commit (but be careful when committing changes at this point)
git checkout [commit id]
```

#### Working with branches
```
# checking out an existing branch
git checkout [branch_name]
eg: git checkout feature/someCoolFeature

OBS checkout checks out branches not files, no .js


# create new branches (from current branch)
git checkout -b [branch_name]
eg: git checkout -b features
```

Note: When workng with others, remember to:
- `git pull` on existing branch before branching


#### Clone a repository
```
git clone [url]
eg: git clone git@github.com:ErlendS/learning.git
```


### Node Package Manager -- npm
```
# install
npm install [package_name]
eg: npm install lodash

# install and save to dependencies
npm install [package_name] --save

```

### Javascript resources

- http://eloquentjavascript.net/
- https://github.com/getify/You-Dont-Know-JS
