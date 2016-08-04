elifePipeline {
    stage 'Checkout'
    checkout scm
    def commit = elifeGitRevision()

    stage 'Project tests'
    def testArtifact = "${env.BUILD_TAG}.junit.xml"
    elifeSwitchRevision 'elife-dashboard-develop--ci', commit
    elifeCmd 'elife-dashboard-develop--ci', 'cd /srv/elife-dashboard; ./project_tests.sh || echo TESTS FAILED!'
    elifeTestArtifact testArtifact, 'elife-dashboard-develop--ci', '/srv/elife-dashboard/build/junit.xml'
    elifeVerifyJunitXml testArtifact

    stage 'End2end tests'
    elifeEnd2EndTest {
        elifeSwitchRevision 'elife-dashboard-develop--end2end', commit
    }

    stage 'Approval'
    elifeGitMoveToBranch commit, 'approved'
}
