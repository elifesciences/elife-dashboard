elifePipeline {
    stage 'Checkout'
    checkout scm
    def commit = elifeGitRevision()

    stage 'Project tests', {
        lock('elife-dashboard--ci') {
            builderDeployRevision 'elife-dashboard--ci', commit
            builderProjectTests 'elife-dashboard--ci', '/srv/elife-dashboard', ['/srv/elife-dashboard/build/junit.xml']
        }
    }

    elifeMainlineOnly {
        stage 'End2end tests', {
            elifeSpectrum(
                deploy: [
                    stackname: 'elife-dashboard--end2end',
                    revision: commit,
                    folder: '/srv/elife-dashboard'
                ]
            )
        }

        stage 'Deploy on continuumtest', {
            lock('elife-dashboard--continuumtest') {
                builderDeployRevision 'elife-dashboard--continuumtest', commit
                builderSmokeTests 'elife-dashboard--continuumtest', '/srv/elife-dashboard'
            }
        }

        stage 'Approval', {
            elifeGitMoveToBranch commit, 'approved'
        }
    }
}
