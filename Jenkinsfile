node {   
    stage('Init') {
        echo "My branch is: ${env.BRANCH_NAME}"
        sh "cd /var/www/lukasmestan.com"
        sh "git pull origin master"
    }

    stage('Build') {
        sh "bundle exec jekyll build"
    }

    stage('Deploy') {
        sh "bundle exec htmlproofer ./_site --only-4xx"
    }
}
