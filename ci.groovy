#!/usr/bin/env groovy 
/**
 * Jenkins Pipeline for APX
 * 
 * @author AppNA DevOps
 * @version 1.0
 * @description DRY Jenkins pipeline. 
 */

/**
 * Job Details Env Variables:
 */
env.CURRENT_JOB_NAME = '@apx-ui/toolkit'
env.BUILDABLE = 'y'
env.TESTABLE = 'n'
env.PUBLIC_LIB = 'y'

/*
* Audit Log Env Variables:
*/
env.DEVOPS_TEAM = 'AppNA DevOps'
env.BUILD_TIMESTAMP = new Date().format('yyyy-MM-dd HH:mm:ss')

echo "Starting pipeline execution - ${env.DEVOPS_TEAM}"
echo "Build Timestamp: ${env.BUILD_TIMESTAMP}"



echo "Job Name: ${env.CURRENT_JOB_NAME}"

def requiredEnvVars = [
    'CI_DRY_JENKINS_FILE_PATH',
    'CI_DRY_GIT_REPO_URL', 
    'CI_DRY_GIT_BRANCH',
    'CI_DRY_GIT_CREDENTIALS_ID'
]

def missingVars = []
requiredEnvVars.each { var ->
    if (!env[var]) {
        missingVars.add(var)
    } else {
        echo "Environment variable '${var}' is set"
    }
}

if (missingVars.size() > 0) {
    error "Missing required environment variables: ${missingVars.join(', ')}"
}

echo "All required environment variables are present"

try {
    echo "Loading Jenkins configuration from Git repository..."
    echo "CI Repository: ${env.CI_DRY_GIT_REPO_URL}"
    echo "CI Branch: ${env.CI_DRY_GIT_BRANCH}"
    echo "CI File Path: ${env.CI_DRY_JENKINS_FILE_PATH}"
    
    fileLoader.fromGit(
        env.CI_DRY_JENKINS_FILE_PATH,
        env.CI_DRY_GIT_REPO_URL,
        env.CI_DRY_GIT_BRANCH,
        env.CI_DRY_GIT_CREDENTIALS_ID,
        ''
    )
    
    echo "Jenkins configuration loaded successfully"
    
    echo "Configuration:"
    echo "   - Loaded from: ${env.CI_DRY_GIT_REPO_URL}"
    echo "   - CI Branch: ${env.CI_DRY_GIT_BRANCH}"
    echo "   - Repo Branch: ${env.BRANCH_NAME}"
    echo "   - Timestamp: ${env.BUILD_TIMESTAMP}"
    echo "   - Job: ${env.CURRENT_JOB_NAME}"
    
} catch (Exception e) {
    echo "Failed to load Jenkins configuration: ${e.getMessage()}"
    error "Configuration loading failed: ${e.getMessage()}"
}