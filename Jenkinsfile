#!groovy

node { 

    def workspace = "/var/www/lukasmestan.com"

    stage('Init') {
        echo "My branch is: ${env.BRANCH_NAME}"
        ws(workspace) {
            sh "git pull origin master"
        }
    }

    stage('Build') {
        ws(workspace) {
            sh "bundle exec jekyll build"
        }
    }

    stage('Deploy') {
        ws(workspace) {
            sh "bundle exec htmlproofer ./_site --only-4xx"
        }
    }
}
