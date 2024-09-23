pipeline {
    agent any

    environment {
        // Set USERPROFILE environment variable to ensure PM2 uses the correct path on Windows
        USERPROFILE = "${env.USERPROFILE}" // This defaults to the current user's profile directory
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                checkout scm
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                // Navigate to the LegacyCodeFE directory and install dependencies
                bat '''
                cd LegacyCodeFE
                npm install
                '''
            }
        }

        

        stage('Run Frontend') {
            steps {
                // Start the frontend application using PM2
                bat '''
                set USERPROFILE=%USERPROFILE%
                pm2 start npm --name "frontend" -- run start
                '''
            }
        }

        stage('Build and Run LegacyCode Backend') {
            steps {
                // Navigate to LegacyCode and build Spring Boot application
                dir('LegacyCode') {
                    bat '''
                    set USERPROFILE=%USERPROFILE%
                    ./mvnw clean install
                    java -jar target\\*.jar
                    '''
                }
            }
        }

        stage('Build and Run LegacyCodeCart Backend') {
            steps {
                // Navigate to LegacyCodeCart and build Spring Boot application
                dir('LegacyCodeCart') {
                    bat '''
                    set USERPROFILE=%USERPROFILE%
                    ./mvnw clean install
                    java -jar target\\*.jar
                    '''
                }
            }
        }
    }

    post {
        always {
            // Output message to indicate the end of the pipeline
            echo 'Pipeline completed.'
        }
        failure {
            // Output message in case of pipeline failure
            echo 'Build failed, please check logs.'
        }
    }
}
