$repoPath = https://github.com/ajlammiman/


function SetUpNewReactProject($folderName) 
{
    git clone https://github.com/ajlammiman/reactprojectbase.git C:\inetpub\wwwroot\$folderName
}


function SetUpNewConsoleProject($folderName) 
{
   $repo = $repoPath + '/basicconsoleproject.git'
   $path = C:\inetpub\wwwroot\$folderName

    GitCheckoutRepo($repo, $path)
}

function GitCheckoutRepo($repo, $path)
{
    git clone $repo $path
}


SetUpNewConsoleProject consoleTest

