var options = {
    debug: true,
    logLevel: 'silent'
};
var config = require('config')(options);
var $ = require('jquery');
global.$ = $;
var current = require('../js/pages/current.js')(config);


//component to be tested
describe('Current', function () {
    'use strict';
    var articlesData  =  {
        "error": [
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA5VDAxOjIxOjA1\nWiIsICJydW4iOiAiZjQ3OWQ3NTItYjFkNS00MjQ4LThmYWUtMWNkNmRiOTAwMjU2IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMTQwNy4zL2Y0NzlkNzUyLWIxZDUtNDI0OC04ZmFlLTFjZDZkYjkwMDI1\nNiIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjExNDA3LjMvZjQ3OWQ3NTItYjFk\nNS00MjQ4LThmYWUtMWNkNmRiOTAwMjU2L2VsaWZlLTExNDA3LXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMTQwNyJ9fQ==\n",
                "article-id": "11407",
                "article-type": "research-article",
                "authors": "Saranya Subramani, Harmonie Perdreau-Dahl, Jens Preben Morth, Eduardo A Groisman",
                "corresponding-authors": "Jens Preben Morth",
                "doi": "10.7554/eLife.11407",
                "event-status": "error",
                "event-timestamp": 1464804196,
                "event-type": "Approve Publication",
                "id": "11407",
                "path": "content/5/e11407v3",
                "preview-link": "https://elifesciences.org/content/5/e11407v3",
                "publication-date": "2016-01-18T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 2,
                "run-id": "f479d752-b1d5-4248-8fae-1cd6db900256",
                "status": "VOR",
                "title": "The magnesium transporter A is activated by cardiolipin and is highly sensitive to free magnesium in vitro",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE0LTExLTAzVDAwOjAwOjAw\nWiIsICJydW4iOiAiMjhlZWE1ODktMThhYy00MTczLTkxZDAtNThiNmQ0MGEzNWM3IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwMzQzMC4yLzI4ZWVhNTg5LTE4YWMtNDE3My05MWQwLTU4YjZkNDBhMzVj\nNyIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjAzNDMwLjIvMjhlZWE1ODktMThh\nYy00MTczLTkxZDAtNThiNmQ0MGEzNWM3L2VsaWZlLTAzNDMwLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwMzQzMCJ9fQ==\n",
                "article-id": "03430",
                "article-type": "research-article",
                "authors": "Thomas A Hopf, Charlotta P I Sch\u00e4rfe, Jo\u00e3o P G L M Rodrigues, Anna G Green, Oliver Kohlbacher, Chris Sander, Alexandre M J J Bonvin, Debora S Marks, John Kuriyan",
                "corresponding-authors": "Chris Sander, Alexandre M J J Bonvin, Debora S Marks",
                "doi": "10.7554/eLife.03430",
                "event-status": "error",
                "event-timestamp": 1455095294,
                "event-type": "Post EIF",
                "id": "03430",
                "path": "content/3/e03430v2",
                "preview-link": "https://elifesciences.org/content/3/e03430v2",
                "publication-date": "2014-09-25T00:00:00Z",
                "publication-status": "publication in progress",
                "run": 5,
                "run-id": "c03211f7-6e1e-492d-9312-e0a80857873c",
                "scheduled-publication-date": 1464210000,
                "status": "VOR",
                "title": "Sequence co-evolution gives 3D contacts and structures of protein complexes",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTA1LTA2VDE3OjMxOjIy\nWiIsICJydW4iOiAiOWY4YzBkYjUtYjJmMi00YjhmLTlmOGQtOGExMTg4NjliOGExIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxNTgwMi4xLzlmOGMwZGI1LWIyZjItNGI4Zi05ZjhkLThhMTE4ODY5Yjhh\nMSIsICJ2ZXJzaW9uIjogIjEiLCAiZWlmX2xvY2F0aW9uIjogIjE1ODAyLjEvOWY4YzBkYjUtYjJm\nMi00YjhmLTlmOGQtOGExMTg4NjliOGExL2VsaWZlLTE1ODAyLXYxLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxNTgwMiJ9fQ==\n",
                "article-id": "15802",
                "article-type": "research-article",
                "authors": "David Mavor, Kyle Barlow, Samuel Thompson, Benjamin A Barad, Alain R Bonny, Clinton L Cario, Garrett Gaskins, Zairan Liu, Laura Deming, Seth D Axen, Elena Caceres, Weilin Chen, Adolfo Cuesta, Rachel E Gate, Evan M Green, Kaitlin R Hulce, Weiyue Ji, Lillian R Kenner, Bruk Mensa, Leanna S Morinishi, Steven M Moss, Marco Mravic, Ryan K Muir, Stefan Niekamp, Chimno I Nnadi, Eugene Palovcak, Erin M Poss, Tyler D Ross, Eugenia C Salcedo, Stephanie K See, Meena Subramaniam, Allison W Wong, Jennifer Li, Kurt S Thorn, Shane \u00d3 Conch\u00fair, Benjamin P Roscoe, Eric D Chow, Joseph L DeRisi, Tanja Kortemme, Daniel N Bolon, James S Fraser, Jeffery W Kelly",
                "corresponding-authors": "James S Fraser",
                "doi": "10.7554/eLife.15802",
                "event-status": "error",
                "event-timestamp": 1464783515,
                "event-type": "Approve Publication",
                "id": "15802",
                "path": "content/5/e15802v1",
                "preview-link": "https://elifesciences.org/content/5/e15802v1",
                "publication-date": "2016-04-25T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 6,
                "run-id": "9f8c0db5-b2f2-4b8f-9f8d-8a118869b8a1",
                "scheduled-publication-date": 1464037200,
                "status": "VOR",
                "title": "Determination of ubiquitin fitness landscapes under different chemical stresses in a classroom setting",
                "version": 1
            }
        ],
        "in-progress": [
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA4VDE5OjU5OjQw\nWiIsICJydW4iOiAiZjdhMWI0OTgtYjVmNS00M2E4LWI1ZTQtY2MyNjU1MmM0NjkzIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTUzMi4yL2Y3YTFiNDk4LWI1ZjUtNDNhOC1iNWU0LWNjMjY1NTJjNDY5\nMyIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjA5NTMyLjIvZjdhMWI0OTgtYjVm\nNS00M2E4LWI1ZTQtY2MyNjU1MmM0NjkzL2VsaWZlLTA5NTMyLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTUzMiJ9fQ==\n",
                "article-id": "09532",
                "article-type": "research-article",
                "authors": "Anusmita Sahoo, Shruti Khare, Sivasankar Devanarayanan, Pankaj C. Jain, Raghavan Varadarajan, John Kuriyan",
                "corresponding-authors": "Raghavan Varadarajan",
                "doi": "10.7554/eLife.09532",
                "event-status": "end",
                "event-timestamp": 1454964979,
                "event-type": "Update LAX",
                "id": "09532",
                "path": "content/4/e09532v2",
                "preview-link": "https://elifesciences.org/content/4/e09532v2",
                "publication-date": "2015-12-30T00:00:00Z",
                "publication-status": "published",
                "run": 2,
                "run-id": "f7a1b498-b5f5-43a8-b5e4-cc26552c4693",
                "status": "VOR",
                "title": "Residue proximity information and protein model discrimination using saturation-suppressor mutagenesis",
                "version": 2
            },
            {
                "article-id": "08411",
                "event-status": "end",
                "event-timestamp": 1467390787,
                "event-type": "Expand Article",
                "id": "08411",
                "publication-status": "publication in progress",
                "run": 1,
                "run-id": "8b1a3871-1c47-4f34-b5e9-0169a147602d",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTA2LTE0VDEwOjM4OjA0\nWiIsICJydW4iOiAiYTQ3NDgyMWUtY2Y2MC00ODQ4LTg4ZTUtMTY2MmM4ZTAyNjI4IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxNTIwMi4yL2E0NzQ4MjFlLWNmNjAtNDg0OC04OGU1LTE2NjJjOGUwMjYy\nOCIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjE1MjAyLjIvYTQ3NDgyMWUtY2Y2\nMC00ODQ4LTg4ZTUtMTY2MmM4ZTAyNjI4L2VsaWZlLTE1MjAyLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxNTIwMiJ9fQ==\n",
                "article-id": "15202",
                "article-type": "research-article",
                "authors": "Hongkang Zhang, Elaine Reichert, Adam E Cohen, Indira M Raman",
                "corresponding-authors": "Adam E Cohen",
                "doi": "10.7554/eLife.15202",
                "event-status": "end",
                "event-timestamp": 1466771375,
                "event-type": "Expand Article",
                "id": "15202",
                "path": "content/5/e15202v2",
                "preview-link": "https://elifesciences.org/content/5/e15202v2",
                "publication-date": "2016-05-24T00:00:00Z",
                "publication-status": "publication in progress",
                "run": 2,
                "run-id": "77ae7bf9-3536-4e87-b8b4-e22e0819968d",
                "status": "VOR",
                "title": "Optical electrophysiology for probing function and pharmacology of voltage-gated ion channels",
                "version": 2
            }
        ],
        "scheduled": [
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA4VDE0OjE2OjMx\nWiIsICJydW4iOiAiYjZlZjVkMWYtMjNiMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTAwMy4zL2I2ZWY1ZDFmLTIzYjMtNGY0ZS05YmEzLTdkZTI0Zjg4NTE3\nMSIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA5MDAzLjMvYjZlZjVkMWYtMjNi\nMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxL2VsaWZlLTA5MDAzLXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTAwMyJ9fQ==\n",
                "article-id": "09003",
                "article-type": "research-article",
                "authors": "Miyuki Suzawa, Diego A Miranda, Karmela A Ramos, Kenny K-H Ang, Emily J Faivre, Christopher G Wilson, Laura Caboni, Michelle R Arkin, Yeong-Sang Kim, Robert J Fletterick, Aaron Diaz, John S Schneekloth, Holly A Ingraham, Peter Tontonoz",
                "corresponding-authors": "Holly A Ingraham",
                "doi": "10.7554/eLife.09003",
                "event-status": "end",
                "event-timestamp": 1454940991,
                "event-type": "Post EIF",
                "id": "09003",
                "path": "content/4/e09003v3",
                "preview-link": "https://elifesciences.org/content/4/e09003v3",
                "publication-date": "2015-12-11T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
                "scheduled-publication-date": 1472677200,
                "status": "VOR",
                "title": "A gene-expression screen identifies a non-toxic sumoylation inhibitor that mimics SUMO-less human LRH-1 in liver",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA4VDE5OjUzOjU0\nWiIsICJydW4iOiAiMGNhN2I3OTctN2FmYi00MzU3LWEwMmEtZjM0MDI3MzBjMGZjIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTY3Mi4zLzBjYTdiNzk3LTdhZmItNDM1Ny1hMDJhLWYzNDAyNzMwYzBm\nYyIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA5NjcyLjMvMGNhN2I3OTctN2Fm\nYi00MzU3LWEwMmEtZjM0MDI3MzBjMGZjL2VsaWZlLTA5NjcyLXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTY3MiJ9fQ==\n",
                "article-id": "09672",
                "article-type": "research-article",
                "authors": "Samir Bhatt, Daniel J Weiss, Bonnie Mappin, Ursula Dalrymple, Ewan Cameron, Donal Bisanzio, David L Smith, Catherine L Moyes, Andrew J Tatem, Michael Lynch, Cristin A Fergus, Joshua Yukich, Adam Bennett, Thomas P Eisele, Jan Kolaczinski, Richard E Cibulskis, Simon I Hay, Peter W Gething, Catherine Kyobutungi",
                "corresponding-authors": "Peter W Gething",
                "doi": "10.7554/eLife.09672",
                "event-status": "end",
                "event-timestamp": 1454961234,
                "event-type": "Post EIF",
                "id": "09672",
                "path": "content/4/e09672v3",
                "preview-link": "https://elifesciences.org/content/4/e09672v3",
                "publication-date": "2015-12-29T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "0ca7b797-7afb-4357-a02a-f3402730c0fc",
                "scheduled-publication-date": 1461150000,
                "status": "VOR",
                "title": "Coverage and system efficiencies of insecticide-treated nets in Africa from 2000 to 2017",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA5VDE3OjA3OjM1\nWiIsICJydW4iOiAiNjgwNWJlZDUtMzQxNi00Y2JhLTk5NjAtZDg5N2E2NGM5MzIwIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMDg1Ni4yLzY4MDViZWQ1LTM0MTYtNGNiYS05OTYwLWQ4OTdhNjRjOTMy\nMCIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjEwODU2LjIvNjgwNWJlZDUtMzQx\nNi00Y2JhLTk5NjAtZDg5N2E2NGM5MzIwL2VsaWZlLTEwODU2LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMDg1NiJ9fQ==\n",
                "article-id": "10856",
                "article-type": "research-article",
                "authors": "Yasin F Dagdas, Khaoula Belhaj, Abbas Maqbool, Angela Chaparro-Garcia, Pooja Pandey, Benjamin Petre, Nadra Tabassum, Neftaly Cruz-Mireles, Richard K Hughes, Jan Sklenar, Joe Win, Frank Menke, Kim Findlay, Mark J Banfield, Sophien Kamoun, Tolga O Bozkurt, Jean T Greenberg",
                "corresponding-authors": "Sophien Kamoun, Tolga O Bozkurt",
                "doi": "10.7554/eLife.10856",
                "event-status": "end",
                "event-timestamp": 1455037655,
                "event-type": "Post EIF",
                "id": "10856",
                "path": "content/5/e10856v2",
                "preview-link": "https://elifesciences.org/content/5/e10856v2",
                "publication-date": "2016-01-14T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 3,
                "run-id": "6805bed5-3416-4cba-9960-d897a64c9320",
                "scheduled-publication-date": 1471381200,
                "status": "VOR",
                "title": "An effector of the Irish potato famine pathogen antagonizes a host autophagy cargo receptor",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE3VDEyOjA5OjAx\nWiIsICJydW4iOiAiZWVmNWExNGEtMDliNi00YWFhLTgxMzgtY2QwZjUyMWFmYTE0IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMjA5NS4zL2VlZjVhMTRhLTA5YjYtNGFhYS04MTM4LWNkMGY1MjFhZmEx\nNCIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjEyMDk1LjMvZWVmNWExNGEtMDli\nNi00YWFhLTgxMzgtY2QwZjUyMWFmYTE0L2VsaWZlLTEyMDk1LXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMjA5NSJ9fQ==\n",
                "article-id": "12095",
                "article-type": "research-article",
                "authors": "Simon Mysling, Kristian K\u00f8lby Kristensen, Mikael Larsson, Anne P Beigneux, Henrik G\u00e5rdsvoll, Fong G Loren, Andr\u00e9 Bensadouen, Thomas JD J\u00f8rgensen, Stephen G Young, Michael Ploug, Christopher K. Glass",
                "corresponding-authors": "Michael Ploug",
                "doi": "10.7554/eLife.12095",
                "event-status": "end",
                "event-timestamp": 1455710941,
                "event-type": "Post EIF",
                "id": "12095",
                "path": "content/5/e12095v3",
                "preview-link": "https://elifesciences.org/content/5/e12095v3",
                "publication-date": "2016-01-03T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 2,
                "run-id": "eef5a14a-09b6-4aaa-8138-cd0f521afa14",
                "scheduled-publication-date": 1466542800,
                "status": "VOR",
                "title": "The acidic domain of the endothelial membrane protein GPIHBP1 stabilizes lipoprotein lipase activity by preventing unfolding of its catalytic domain",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE1VDEwOjQ3OjQ0\nWiIsICJydW4iOiAiZWI5MDc5MDYtZTY0MS00NWQ3LTg3OWItZTY1NDU0ZmZjYWYyIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMTIxNC4zL2ViOTA3OTA2LWU2NDEtNDVkNy04NzliLWU2NTQ1NGZmY2Fm\nMiIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjExMjE0LjMvZWI5MDc5MDYtZTY0\nMS00NWQ3LTg3OWItZTY1NDU0ZmZjYWYyL2VsaWZlLTExMjE0LXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMTIxNCJ9fQ==\n",
                "article-id": "11214",
                "article-type": "research-article",
                "authors": "Hern\u00e1n Morales-Navarrete, Fabi\u00e1n Segovia-Miranda, Piotr Klukowski, Kirstin Meyer, Hidenori Nonaka, Giovanni Marsico, Mikhail Chernykh, Alexander Kalaidzidis, Marino Zerial, Yannis Kalaidzidis, Fiona M Watt",
                "corresponding-authors": "Marino Zerial, Yannis Kalaidzidis",
                "doi": "10.7554/eLife.11214",
                "event-status": "end",
                "event-timestamp": 1455533264,
                "event-type": "Post EIF",
                "id": "11214",
                "path": "content/4/e11214v3",
                "preview-link": "https://elifesciences.org/content/4/e11214v3",
                "publication-date": "2015-12-27T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 3,
                "run-id": "eb907906-e641-45d7-879b-e65454ffcaf2",
                "scheduled-publication-date": 1465819200,
                "status": "VOR",
                "title": "A versatile pipeline for the multi-scale digital reconstruction and quantitative analysis of 3D tissue architecture",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTEzVDA1OjUxOjMx\nWiIsICJydW4iOiAiMmRiZWJmYTYtMDFjNS00OWM5LTliMTgtZmIyYzllMDMxNjFmIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwODE0OS4zLzJkYmViZmE2LTAxYzUtNDljOS05YjE4LWZiMmM5ZTAzMTYx\nZiIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA4MTQ5LjMvMmRiZWJmYTYtMDFj\nNS00OWM5LTliMTgtZmIyYzllMDMxNjFmL2VsaWZlLTA4MTQ5LXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwODE0OSJ9fQ==\n",
                "article-id": "08149",
                "article-type": "research-article",
                "authors": "Jasper J Visser, Yolanda Cheng, Steven C Perry, Andrew Benjamin Chastain, Bayan Parsa, Shatha S Masri, Thomas A Ray, Jeremy N Kay, Woj M Wojtowicz, Constance Cepko",
                "corresponding-authors": "Woj M Wojtowicz",
                "doi": "10.7554/eLife.08149",
                "event-status": "end",
                "event-timestamp": 1455342692,
                "event-type": "Post EIF",
                "id": "08149",
                "path": "content/4/e08149v3",
                "preview-link": "https://elifesciences.org/content/4/e08149v3",
                "publication-date": "2015-12-02T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "2dbebfa6-01c5-49c9-9b18-fb2c9e03161f",
                "scheduled-publication-date": 1461873600,
                "status": "VOR",
                "title": "An extracellular biochemical screen reveals that FLRTs and Unc5s mediate neuronal subtype recognition in the retina",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTEyVDE2OjAwOjMw\nWiIsICJydW4iOiAiMjU4OTBhYWMtZThkOC00NzJiLTg4NTAtZDVmOTcwOWQyYmVkIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMTI4NS4xLzI1ODkwYWFjLWU4ZDgtNDcyYi04ODUwLWQ1Zjk3MDlkMmJl\nZCIsICJ2ZXJzaW9uIjogIjEiLCAiZWlmX2xvY2F0aW9uIjogIjExMjg1LjEvMjU4OTBhYWMtZThk\nOC00NzJiLTg4NTAtZDVmOTcwOWQyYmVkL2VsaWZlLTExMjg1LXYxLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMTI4NSJ9fQ==\n",
                "article-id": "11285",
                "article-type": "research-article",
                "authors": "Rachel Lowe, Caio AS Coelho, Christovam Barcellos, Marilia S\u00e1 Carvalho, Rafael De Castro Cat\u00e3o, Giovanini E Coelho, Walter Massa Ramalho, Trevor C Bailey, David B Stephenson, Xavier Rod\u00f3, Simon I Hay",
                "corresponding-authors": "Rachel Lowe",
                "doi": "10.7554/eLife.11285",
                "event-status": "end",
                "event-timestamp": 1455292830,
                "event-type": "Post EIF",
                "id": "11285",
                "path": "content/5/e11285v1",
                "preview-link": "https://elifesciences.org/content/5/e11285v1",
                "publication-date": "2016-02-13T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "25890aac-e8d8-472b-8850-d5f9709d2bed",
                "scheduled-publication-date": 1465851600,
                "status": "VOR",
                "title": "Evaluating probabilistic dengue risk forecasts from a prototype early warning system for Brazil",
                "version": 1
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTEzVDA5OjA0OjI1\nWiIsICJydW4iOiAiMjVkMDMyOGQtZmJiNy00MjQ5LThkNDUtZjUyYjM0MTUxODZhIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMjQxMS4zLzI1ZDAzMjhkLWZiYjctNDI0OS04ZDQ1LWY1MmIzNDE1MTg2\nYSIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjEyNDExLjMvMjVkMDMyOGQtZmJi\nNy00MjQ5LThkNDUtZjUyYjM0MTUxODZhL2VsaWZlLTEyNDExLXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMjQxMSJ9fQ==\n",
                "article-id": "12411",
                "article-type": "research-article",
                "authors": "Brian C Richardson, Steve L Halaby, Margaret A Gustafson, J Christopher Fromme, Chris G Burd",
                "corresponding-authors": "J Christopher Fromme",
                "doi": "10.7554/eLife.12411",
                "event-status": "end",
                "event-timestamp": 1455354265,
                "event-type": "Post EIF",
                "id": "12411",
                "path": "content/5/e12411v3",
                "preview-link": "https://elifesciences.org/content/5/e12411v3",
                "publication-date": "2016-01-14T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "25d0328d-fbb7-4249-8d45-f52b3415186a",
                "scheduled-publication-date": 1466542800,
                "status": "VOR",
                "title": "The Sec7 N-terminal regulatory domains facilitate membrane-proximal activation of the Arf1 GTPase",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE1VDA3OjA5OjI5\nWiIsICJydW4iOiAiMjE4MzNjMWMtNGEyNi00YTc4LWFlM2MtOTVmZjljOTYyMTljIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMDY3MC4yLzIxODMzYzFjLTRhMjYtNGE3OC1hZTNjLTk1ZmY5Yzk2MjE5\nYyIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjEwNjcwLjIvMjE4MzNjMWMtNGEy\nNi00YTc4LWFlM2MtOTVmZjljOTYyMTljL2VsaWZlLTEwNjcwLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMDY3MCJ9fQ==\n",
                "article-id": "10670",
                "article-type": "research-article",
                "authors": "Alison F Feder, Soo-Yon Rhee, Susan P Holmes, Robert W Shafer, Dmitri A Petrov, Pleuni S Pennings, Arup K Chakraborty",
                "corresponding-authors": "Alison F Feder",
                "doi": "10.7554/eLife.10670",
                "event-status": "end",
                "event-timestamp": 1455520169,
                "event-type": "Post EIF",
                "id": "10670",
                "path": "content/5/e10670v2",
                "preview-link": "https://elifesciences.org/content/5/e10670v2",
                "publication-date": "2016-02-15T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "scheduled-publication-date": 1472158800,
                "status": "VOR",
                "title": "More effective drugs lead to harder selective sweeps in the evolution of drug resistance in HIV-1",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE4VDA1OjU5OjQw\nWiIsICJydW4iOiAiODAzMzQzNmYtNzlmNS00MDYyLTlkNzctNDRjNmVhZGEyYWJjIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMTMyNC4yLzgwMzM0MzZmLTc5ZjUtNDA2Mi05ZDc3LTQ0YzZlYWRhMmFi\nYyIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjExMzI0LjIvODAzMzQzNmYtNzlm\nNS00MDYyLTlkNzctNDRjNmVhZGEyYWJjL2VsaWZlLTExMzI0LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMTMyNCJ9fQ==\n",
                "article-id": "11324",
                "article-type": "research-article",
                "authors": "Wei Zhang, Paul Jong Kim, Zhongcan Chen, Hidayat Lokman, Lifeng Qiu, Ke Zhang, Steven George Rozen, Eng King Tan, Hyunsoo Shawn Je, Li Zeng, Eunjoon Kim",
                "corresponding-authors": "Hyunsoo Shawn Je, Li Zeng",
                "doi": "10.7554/eLife.11324",
                "event-status": "end",
                "event-timestamp": 1455775180,
                "event-type": "Post EIF",
                "id": "11324",
                "path": "content/5/e11324v2",
                "preview-link": "https://elifesciences.org/content/5/e11324v2",
                "publication-date": "2016-02-17T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 2,
                "run-id": "8033436f-79f5-4062-9d77-44c6eada2abc",
                "scheduled-publication-date": 1472126400,
                "status": "VOR",
                "title": "MiRNA-128 regulates the proliferation and neurogenesis of neural precursors by targeting PCM1 in the developing cortex",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTIyVDE1OjM4OjAy\nWiIsICJydW4iOiAiMzYzYWJjODAtZDVkNy00ODJjLWFmZWYtZTQ2MTE3YTAzOGY0IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMDQ4My4yLzM2M2FiYzgwLWQ1ZDctNDgyYy1hZmVmLWU0NjExN2EwMzhm\nNCIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjEwNDgzLjIvMzYzYWJjODAtZDVk\nNy00ODJjLWFmZWYtZTQ2MTE3YTAzOGY0L2VsaWZlLTEwNDgzLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMDQ4MyJ9fQ==\n",
                "article-id": "10483",
                "article-type": "research-article",
                "authors": "Andrew R Conery, Richard C Centore, Adrianne Neiss, Patricia J Keller, Shivangi Joshi, Kerry L Spillane, Peter Sandy, Charlie Hatton, Eneida Pardo, Laura Zawadzke, Archana Bommi-Reddy, Karen E Gascoigne, Barbara M Bryant, Jennifer A Mertz, Robert J Sims, Scott A Armstrong",
                "corresponding-authors": "Robert J Sims",
                "doi": "10.7554/eLife.10483",
                "event-status": "end",
                "event-timestamp": 1456155482,
                "event-type": "Post EIF",
                "id": "10483",
                "path": "content/5/e10483v2",
                "preview-link": "https://elifesciences.org/content/5/e10483v2",
                "publication-date": "2016-01-05T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "363abc80-d5d7-482c-afef-e46117a038f4",
                "scheduled-publication-date": 1471554000,
                "status": "VOR",
                "title": "Bromodomain inhibition of the transcriptional coactivators CBP/EP300 as a therapeutic strategy to target the IRF4 network in multiple myeloma",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTIzVDA4OjM4OjU4\nWiIsICJydW4iOiAiOWFmYjRhNjAtZjI5Ny00ZTlhLTkwMzYtNzgzNDAxNGVlNWVhIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTQ2Mi4xLzlhZmI0YTYwLWYyOTctNGU5YS05MDM2LTc4MzQwMTRlZTVl\nYSIsICJ2ZXJzaW9uIjogIjEiLCAiZWlmX2xvY2F0aW9uIjogIjA5NDYyLjEvOWFmYjRhNjAtZjI5\nNy00ZTlhLTkwMzYtNzgzNDAxNGVlNWVhL2VsaWZlLTA5NDYyLXYxLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTQ2MiJ9fQ==\n",
                "article-id": "09462",
                "article-type": "research-article",
                "authors": "Babette Haven, Elysia Heilig, Cristine Donham, Michael Settles, Nicole Vasilevsky, Katherine Owen, , Karen Adelman, Elizabeth Iorns, William Gunn, Fraser Tan, Joelle Lomax, Nicole Perfito, Timothy Errington",
                "corresponding-authors": "",
                "doi": "10.7554/eLife.09462",
                "event-status": "end",
                "event-timestamp": 1456216738,
                "event-type": "Post EIF",
                "id": "09462",
                "path": "content/5/e09462v1",
                "preview-link": "https://elifesciences.org/content/5/e09462v1",
                "publication-date": "2016-02-23T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "9afb4a60-f297-4e9a-9036-7834014ee5ea",
                "scheduled-publication-date": 1466715600,
                "status": "VOR",
                "title": "Registered report: A chromatin-mediated reversible drug-tolerant state in cancer cell subpopulations",
                "version": 1
            }
        ],
        "uir": [
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE2VDEyOjQwOjIx\nWiIsICJydW4iOiAiYTNjZGZkM2QtMGU4MS00Y2JmLWI0NTQtMDg0NzEyZjZkYTUzIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTE3OC4yL2EzY2RmZDNkLTBlODEtNGNiZi1iNDU0LTA4NDcxMmY2ZGE1\nMyIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjA5MTc4LjIvYTNjZGZkM2QtMGU4\nMS00Y2JmLWI0NTQtMDg0NzEyZjZkYTUzL2VsaWZlLTA5MTc4LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTE3OCJ9fQ==\n",
                "article-id": "09178",
                "article-type": "research-article",
                "authors": "Annalise B Paaby, Amelia G White, David D Riccardi, Kristin C Gunsalus, Fabio Piano, Matthew V Rockman, Jonathan Flint",
                "corresponding-authors": "Annalise B Paaby, Matthew V Rockman",
                "doi": "10.7554/eLife.09178",
                "event-status": "end",
                "event-timestamp": 1455626422,
                "event-type": "Post EIF",
                "id": "09178",
                "path": "content/4/e09178v2",
                "preview-link": "https://elifesciences.org/content/4/e09178v2",
                "publication-date": "2015-08-22T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "a3cdfd3d-0e81-4cbf-b454-084712f6da53",
                "status": "VOR",
                "title": "Wild worm embryogenesis harbors ubiquitous polygenic modifier variation",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE5VDE4OjI2OjE4\nWiIsICJydW4iOiAiYjgzM2U2OWQtMDBjYi00ZjZiLWFlZTYtOWYzN2YxZGY2NWQxIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMjM4Ni4yL2I4MzNlNjlkLTAwY2ItNGY2Yi1hZWU2LTlmMzdmMWRmNjVk\nMSIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjEyMzg2LjIvYjgzM2U2OWQtMDBj\nYi00ZjZiLWFlZTYtOWYzN2YxZGY2NWQxL2VsaWZlLTEyMzg2LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMjM4NiJ9fQ==\n",
                "article-id": "12386",
                "article-type": "article-commentary",
                "authors": "Daniel J Kliebenstein",
                "corresponding-authors": "Daniel J Kliebenstein",
                "doi": "10.7554/eLife.12386",
                "event-status": "end",
                "event-timestamp": 1455906378,
                "event-type": "Post EIF",
                "id": "12386",
                "path": "content/4/e12386v2",
                "preview-link": "https://elifesciences.org/content/4/e12386v2",
                "publication-date": "2015-12-15T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 18,
                "run-id": "b833e69d-00cb-4f6b-aee6-9f37f1df65d1",
                "status": "VOR",
                "title": "Evolution retraces its steps to advance",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTE5VDE3OjI0OjQy\nWiIsICJydW4iOiAiYmFlNjgwNTMtYzE3YS00MmQxLTljMjQtY2RkMzg5NjJjYjU2IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwNzM5OC4zL2JhZTY4MDUzLWMxN2EtNDJkMS05YzI0LWNkZDM4OTYyY2I1\nNiIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA3Mzk4LjMvYmFlNjgwNTMtYzE3\nYS00MmQxLTljMjQtY2RkMzg5NjJjYjU2L2VsaWZlLTA3Mzk4LXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwNzM5OCJ9fQ==\n",
                "article-id": "07398",
                "article-type": "research-article",
                "authors": "David Flores-Benitez, Elisabeth Knust, K VijayRaghavan",
                "corresponding-authors": "Elisabeth Knust",
                "doi": "10.7554/eLife.07398",
                "event-status": "end",
                "event-timestamp": 1455902682,
                "event-type": "Post EIF",
                "id": "07398",
                "path": "content/4/e07398v3",
                "preview-link": "https://elifesciences.org/content/4/e07398v3",
                "publication-date": "2015-11-06T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "bae68053-c17a-42d1-9c24-cdd38962cb56",
                "status": "VOR",
                "title": "Crumbs is an essential regulator of cytoskeletal dynamics and cell-cell adhesion during dorsal closure in <italic>Drosophila</italic>",
                "version": 3
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTIzVDExOjI1OjM2\nWiIsICJydW4iOiAiNzZkY2ZjYjAtYzUwMC00MDRlLWE2ODYtMGUyZGYxNjZmZTY0IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTEwMC4yLzc2ZGNmY2IwLWM1MDAtNDA0ZS1hNjg2LTBlMmRmMTY2ZmU2\nNCIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjA5MTAwLjIvNzZkY2ZjYjAtYzUw\nMC00MDRlLWE2ODYtMGUyZGYxNjZmZTY0L2VsaWZlLTA5MTAwLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTEwMCJ9fQ==\n",
                "article-id": "09100",
                "article-type": "research-article",
                "authors": "Samuel Zambrano, Ilario De Toma, Arianna Piffer, Marco E Bianchi, Alessandra Agresti, Suzanne Gaudet",
                "corresponding-authors": "Marco E Bianchi, Alessandra Agresti",
                "doi": "10.7554/eLife.09100",
                "event-status": "end",
                "event-timestamp": 1456226736,
                "event-type": "Post EIF",
                "id": "09100",
                "path": "content/5/e09100v2",
                "preview-link": "https://elifesciences.org/content/5/e09100v2",
                "publication-date": "2016-01-14T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "76dcfcb0-c500-404e-a686-0e2df166fe64",
                "status": "VOR",
                "title": "NF-\u03baB oscillations translate into functionally related patterns of gene expression",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTIzVDExOjUxOjM3\nWiIsICJydW4iOiAiYmFhNDJiMzYtNTdmYS00N2NjLTkwODYtMzdiZTNjNjI3ZjUxIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMjAyNC4yL2JhYTQyYjM2LTU3ZmEtNDdjYy05MDg2LTM3YmUzYzYyN2Y1\nMSIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjEyMDI0LjIvYmFhNDJiMzYtNTdm\nYS00N2NjLTkwODYtMzdiZTNjNjI3ZjUxL2VsaWZlLTEyMDI0LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMjAyNCJ9fQ==\n",
                "article-id": "12024",
                "article-type": "research-article",
                "authors": "Declan G Lyons, Alexandre Parpaleix, Morgane Roche, Serge Charpak, David Kleinfeld",
                "corresponding-authors": "Serge Charpak",
                "doi": "10.7554/eLife.12024",
                "event-status": "end",
                "event-timestamp": 1456228297,
                "event-type": "Post EIF",
                "id": "12024",
                "path": "content/5/e12024v2",
                "preview-link": "https://elifesciences.org/content/5/e12024v2",
                "publication-date": "2016-02-02T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "baa42b36-57fa-47cc-9086-37be3c627f51",
                "status": "VOR",
                "title": "Mapping oxygen concentration in the awake mouse brain",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTA1LTI0VDE3OjE1OjI1\nWiIsICJydW4iOiAiMTE4YTc3ZGItM2ZlMC00MzRiLThjOTktOGY3NzI2NDhlZGJiIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIxMTMwNS4yLzExOGE3N2RiLTNmZTAtNDM0Yi04Yzk5LThmNzcyNjQ4ZWRi\nYiIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjExMzA1LjIvMTE4YTc3ZGItM2Zl\nMC00MzRiLThjOTktOGY3NzI2NDhlZGJiL2VsaWZlLTExMzA1LXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIxMTMwNSJ9fQ==\n",
                "article-id": "11305",
                "article-type": "research-article",
                "authors": "Claire M Gillan, Michal Kosinski, Robert Whelan, Elizabeth A Phelps, Nathaniel D Daw, Michael J Frank",
                "corresponding-authors": "Claire M Gillan",
                "doi": "10.7554/eLife.11305",
                "event-status": "end",
                "event-timestamp": 1464110125,
                "event-type": "Post EIF",
                "id": "11305",
                "path": "content/5/e11305v2",
                "preview-link": "https://elifesciences.org/content/5/e11305v2",
                "publication-date": "2016-03-01T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 6,
                "run-id": "118a77db-3fe0-434b-8c99-8f772648edbb",
                "status": "VOR",
                "title": "Characterizing a psychiatric symptom dimension related to deficits in goal-directed control",
                "version": 2
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDEyLTEyLTEzVDAwOjAwOjAw\nWiIsICJydW4iOiAiYmQwNTcyYjUtZjUyZi00YTkyLTgxZDYtN2M0NTMxOWI2OGQ1IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwMDM1My4xL2JkMDU3MmI1LWY1MmYtNGE5Mi04MWQ2LTdjNDUzMTliNjhk\nNSIsICJ2ZXJzaW9uIjogIjEiLCAiZWlmX2xvY2F0aW9uIjogIjAwMzUzLjEvYmQwNTcyYjUtZjUy\nZi00YTkyLTgxZDYtN2M0NTMxOWI2OGQ1L2VsaWZlLTAwMzUzLXYxLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwMDM1MyJ9fQ==\n",
                "article-id": "00353",
                "article-type": "discussion",
                "authors": "Eve Marder",
                "corresponding-authors": "Eve Marder",
                "doi": "10.7554/eLife.00353",
                "event-status": "end",
                "event-timestamp": 1467625920,
                "event-type": "Post EIF Bridge",
                "id": "00353",
                "path": "content/1/e00353v1",
                "preview-link": "https://elifesciences.org/content/1/e00353v1",
                "publication-date": "2012-12-13T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 44,
                "run-id": "31de31b7-8ec3-4826-94f9-93e8ec7c8796",
                "status": "VOR",
                "title": "A good life",
                "version": 1
            }
        ]
    };


    before(function () {
        var $currentPage = $('<div class="current-page"><div id="articleStats"></div><div id="articles"></div></div>');
        $('body').append($currentPage);
        current.bindEvents();
    });

    after(function () {
        $('.current-page').remove();
    });

    it('current should exist', function () {
        expect(current).to.be.an('object');
    });

    describe('renderLoading()', function () {
        it('Should show loading template', function () {
            current.renderLoading();
            expect(document.querySelector('.loading-template')).to.not.be.null;
        });
    });

    describe('sortArticles()', function () {
        it('Should return articles sorted into categories', function () {
            var dataIn =
            {
                "error": [
                    {
                        "id": "11407" ,
                        "run-id": "f479d752-b1d5-4248-8fae-1cd6db900256",
                        "version": 3
                    }
                ],
                "uir": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-sffdfd",
                        "version": 2
                    }
                ],
                "uirvr": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-sffdfd",
                        "version": 2
                    }
                ],
                "in-progress": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-aasdwwww",
                        "version": 3
                    }
                ],
                "scheduled": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-1csdfsdfd6db900256",
                        "version": 3
                    }
                ]
            };
            var dataOut =
            {
                "error": [
                    {
                        "id": "11407" ,
                        "run-id": "f479d752-b1d5-4248-8fae-1cd6db900256",
                        "version": 3,
                        "url": "11407/3/f479d752-b1d5-4248-8fae-1cd6db900256"
                    }
                ],
                "uir": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-sffdfd",
                        "version": 2,
                        "url": "09178/2/f479d752-b1d5-4248-8fae-sffdfd"
                    }
                ],
                "uirvr": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-sffdfd",
                        "version": 2,
                        "url": "09178/2/f479d752-b1d5-4248-8fae-sffdfd"
                    }
                ],
                "inProgress": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-aasdwwww",
                        "version": 3,
                        "url": "09178/3/f479d752-b1d5-4248-8fae-aasdwwww"
                    }
                ],
                "scheduled": [
                    {
                        "id": "09178",
                        "run-id": "f479d752-b1d5-4248-8fae-1csdfsdfd6db900256",
                        "version": 3,
                        "url": "09178/3/f479d752-b1d5-4248-8fae-1csdfsdfd6db900256"
                    }
                ]
            };
            var result = current.sortArticles(dataIn);
            expect(result).to.eql(dataOut);
        });
    });

    describe('fetchArticlesSuccess()', function () {
        before(function(){
        });
        it('Should render a table of categorised articles and statistics', function () {
            current.fetchArticlesSuccess(articlesData);
            expect(document.querySelector('.article-list-section')).to.not.be.null;
            expect(document.querySelector('.article-stats__section')).to.not.be.null;
        });
    });

    describe('fetchArticlesError()', function () {
        it('Should display standard error alert and error debug alert', function () {
            var data = {
                statusCode: 400,
                statusText: "Error Occurred",
                responseText: {
                    "message": "I'm afraid I can't do that Dave",
                    "detail": "I'm afraid I can't do that Dave",
                }
            };
            current.fetchArticlesError(data);
            var alertBox = document.querySelector('#error-message.fetchArticlesError');
            var statusResult = 'Error Occurred(API Error)';
            var messageResult = 'I\'m afraid I can\'t do that Dave';
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('toggleAddToQueueBtn()', function () {
        it('Should show publish all button when checkbox checked and add to queue', function () {
            var result = [{ id: '09178', version: '2', run: 'a3cdfd3d-0e81-4cbf-b454-084712f6da53',doi: '10.7554/eLife.09178' }];
            current.fetchArticlesSuccess(articlesData);
            $('#checkbox-09178.toggle-publish-all').prop('checked', true);
            $('#checkbox-09178.toggle-publish-all').trigger('change');
            expect($('.btn-publish-queued').is(":visible")).to.be.true;
        });
        it('Should show publish all button when checkbox un-checked and remove from queue', function () {
            current.fetchArticlesSuccess(articlesData);
            $('#checkbox-09178.toggle-publish-all').prop('checked', true);
            $('#checkbox-09178.toggle-publish-all').trigger('change');
            expect($('.btn-publish-queued').is(":visible")).to.be.true;
        });
    });

});

