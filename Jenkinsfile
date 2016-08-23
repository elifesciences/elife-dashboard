elifePipeline {
    stage 'Checkout'
    checkout scm
    def commit = elifeGitRevision()

    stage 'Project tests'
    lock('elife-dashboard--ci') {
        builderDeployRevision 'elife-dashboard--ci', commit
        builderProjectTests 'elife-dashboard--ci', '/srv/elife-dashboard', ['/srv/elife-dashboard/build/junit.xml']
    }

    elifeMainlineOnly {
        stage 'End2end tests'
        elifeEnd2EndTest {
            builderDeployRevision 'elife-dashboard--end2end', commit
        }

        stage 'Approval'
        elifeGitMoveToBranch commit, 'approved'
    }
}
