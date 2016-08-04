elifePipeline {
    stage 'Checkout'
    checkout scm
    def commit = elifeGitRevision()

    stage 'Project tests'
    lock('elife-dashboard--ci') {
        def testArtifact = "${env.BUILD_TAG}.junit.xml"
        builderDeployRevision 'elife-dashboard--ci', commit
        builderProjectTests 'elife-dashboard--ci', '/srv/elife-dashboard'
        builderTestArtifact testArtifact, 'elife-dashboard--ci', '/srv/elife-dashboard/build/junit.xml'
        elifeVerifyJunitXml testArtifact
    }

    elifeMainlineOnly {
        stage 'End2end tests'
        elifeEnd2EndTest {
            elifeSwitchRevision 'elife-dashboard-develop--end2end', commit
        }

        stage 'Approval'
        elifeGitMoveToBranch commit, 'approved'
    }
}
