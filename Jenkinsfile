#!groovy

node {   

    def workspace = "/var/www/lukasmestan.com"

    stage('Init') {
        echo "My branch is: ${env.BRANCH_NAME}"
        dir(workspace) {
            sh "git pull origin master"
        }
    }

    stage('Build') {
        dir(workspace) {
            sh "bundle exec jekyll build"
        }
    }

    stage('Deploy') {
        dir(workspace) {
            sh "bundle exec htmlproofer ./_site --only-4xx"
        }
    }
}
