import datetime
import imp
import csv
import json

from candidate import Candidate
from datagenerator import DataGenerator
from project import Project






model = imp.load_source('process_svm','/Users/heshanjayasinghe/Documents/finalYearProject/fypproject/CustomerJourneyAnalyser/svm/code/Sentiment_svm.py')
model2 = imp.load_source('process_svm','/Users/heshanjayasinghe/Documents/finalYearProject/fypproject/CustomerJourneyAnalyser/svm/code/desitiontress.py')
model3 = imp.load_source('process_svm','/Users/heshanjayasinghe/Documents/finalYearProject/fypproject/CustomerJourneyAnalyser/svm/code/RandomForest3.py')


class DataProviderService:
    def __init__(self, nr_of_items):
        self.data_generator = DataGenerator()
        self.CANDIDATES = self.data_generator.generate_candidates(nr_of_items)

    def get_candidates(self):
        return self.CANDIDATES

    def get_sentimentreviw(self,review):
        result = model.process_svm([review])
        return result


    def get_review(self):
        with open("reviews.tsv") as csvfile:
            writingfile = open('sentiment.csv', 'w')
            readCSV = csv.reader(csvfile, delimiter=",")
            for line in readCSV:
                result = model.process_svm(line[2:3])
                # print (line[0:1])
                # print (result[1])
                # print (result[0])
                # print (line[3:4])
                # print(line[2:3][0])
                writingfile.write('%s,' % line[0:1][0])
                writingfile.write('%s,' % result[1])
                writingfile.write('%s,' % result[0])
                writingfile.write('%s,' % line[3:4][0])
                writingfile.write('%s' % line[2:3][0])
                writingfile.write('\n')
            writingfile.close()
        review = "done";

        return review

    def set_painpoint(self):
        with open("loyal_feature.csv") as csvfile:
            writingfilepain = open('painpoint.csv', 'w')
            writingfileloyal = open('ployalty.csv', 'w')
            readCSV = csv.reader(csvfile, delimiter=",")
            for line in readCSV:

                if line[1:2][0] == '1.0':
                    my_list1 = [line[2:3][0], line[3:4][0]]
                    result = model2.dtree_predict(my_list1)
                    writingfileloyal.write('%s,' % line[0:1][0])
                    writingfileloyal.write('%s,' % result[0])
                    writingfileloyal.write('%s' % line[6:7][0])
                    writingfileloyal.write('\n')
                if line[1:2][0] =='0.0':
                    my_list1 = [float(line[2:3][0])*-1, line[3:4][0]]
                    result = model2.dtree_predict(my_list1)
                    writingfilepain.write('%s,' % line[0:1][0])
                    writingfilepain.write('%s,' % str(float(result[0])))
                    writingfilepain.write('%s' % line[6:7][0])
                    writingfilepain.write('\n')
            writingfileloyal.close()
            writingfilepain.close()
        return "done"


    def get_sentimentprapgdata(self):
        with open("sentiment.csv") as csvfile:
           # writingfile = open('sentiment.csv', 'w')
            readCSV = csv.reader(csvfile, delimiter=",")
            data = []
            for line in readCSV:
                entry = {'product_id': line[1:2][0], 'date': line[0:1][0],'download': line[2:3][0]}
                data.append(entry)
                json.dumps(data)

            print (data)

        return data

    def get_painpointgraphdata(self):
        with open("painpoint.csv") as csvfile:
            # writingfile = open('sentiment.csv', 'w')
            readCSV = csv.reader(csvfile, delimiter=",")
            data = []
            for line in readCSV:
                entry = {'date': line[0:1][0], 'ppoint': line[1:2][0], 'fdata': line[2:3][0]}
                data.append(entry)
                json.dumps(data)

            print (data)

        return data

    def get_ployaltygraphdata(self):
        with open("ployalty.csv") as csvfile:
             # writingfile = open('sentiment.csv', 'w')
            readCSV = csv.reader(csvfile, delimiter=",")
            data = []
            for line in readCSV:
                entry = {'date': line[0:1][0], 'ppoint': line[1:2][0], 'fdata': line[2:3][0]}
                data.append(entry)
                json.dumps(data)

            print (data)

        return data





    def get_candidate(self, id):
        result = None
        if id:
            for cand in self.CANDIDATES:
                if id == str(cand["id"]):
                    result = cand
                    break

        return result

    def get_random_candidates(self, nr_of_candidates):
        return self.data_generator.generate_candidates(nr_of_candidates)

    def update_name(self, id, new_name):
        nr_of_updated_items = 0

        for cand in self.CANDIDATES:
            if id == str(cand["id"]):
                cand["first_name"] = new_name
                nr_of_updated_items += 1
                break

        return nr_of_updated_items

    def delete_candidate(self, id):
        cand_for_delete = None
        for cand in self.CANDIDATES:
            if id == str(cand["id"]):
                cand_for_delete = cand
                break

        if cand_for_delete is not None:
            self.CANDIDATES.remove(cand_for_delete)
            return True
        else:
            return False

    def add_candidate(self, first_name, last_name):
        cand = Candidate(first_name, last_name, [])
        self.CANDIDATES.append(cand.serialize())
        return str(cand.id)

    def add_project(self, project_name, project_description):
        new_project = Project(project_name, datetime.datetime.utcnow(), datetime.datetime.utcnow(), project_description)

        self.CANDIDATES[0]['experience'][0]['projects'].append(new_project.serialize())
        return str(new_project.id)


    def get_random_projects(self, nr_of_projects):
        return self.data_generator.generate_projects(nr_of_projects, True)
