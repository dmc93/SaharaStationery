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
                dir('LegacyCodeFE') {
                    bat '''
                    npm install
                    '''
                }
            }
        }

        stage('Delete pm2 instances') {
            steps {
                bat '''
                pm2 delete all || echo "No PM2 processes running"
                '''
            }
        }

        stage('Run Frontend') {
            steps {
                // Navigate to the LegacyCodeFE directory and start the frontend using PM2
                dir('LegacyCodeFE') {
                    bat '''
                    pm2 start "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" -- start
                    '''
                }
            }
        }

         stage('Build and Run LegacyCode Backend') {
             steps {
                 // Navigate to LegacyCode and build Spring Boot application
                 dir('LegacyCode') {
                     bat '''
                     set USERPROFILE=%USERPROFILE%
                     ./mvnw clean install
                    echo "Echo Build completed"
                    // cd target/
                   // java -jar Items-BE-0.0.1-SNAPSHOT.jar 
                     '''
                 }
                 dir('target') {
                     bat '''
                    echo "Echo about to start jar file"
                     java -jar Items-BE-0.0.1-SNAPSHOT.jar 
                    echo "Echo done starting jar file"
                     '''
                 }
             }
         }


        // stage('Build and Run LegacyCodeCart Backend') {
        //     steps {
        //         // Navigate to LegacyCodeCart and build Spring Boot application
        //         dir('LegacyCodeCart') {
        //             bat '''
        //             set USERPROFILE=%USERPROFILE%
        //             ./mvnw clean install
        //             java -jar target\\*.jar
        //             '''
        //         }
        //     }
        // }
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
