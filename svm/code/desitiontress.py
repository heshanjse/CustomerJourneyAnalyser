import pandas as pd
from sklearn import model_selection
from sklearn.ensemble import BaggingClassifier
from sklearn.externals import joblib
from sklearn.tree import DecisionTreeClassifier

def main():
    url = pd.read_csv('rtdata.csv', sep=',')
    names = ['loyalty', 'sentiment', 'class']
    dataframe = pd.DataFrame(url)
    array = dataframe.values
    X = array[:,0:2]
    Y = array[:,2]
    seed = 7
    kfold = model_selection.KFold(n_splits=10, random_state=seed)
    cart = DecisionTreeClassifier()
    num_trees = 100
    model = BaggingClassifier(base_estimator=cart, n_estimators=num_trees, random_state=seed)
    model.fit(X, Y)
    joblib.dump(model, '/Users/heshanjayasinghe/Documents/finalYearProject/fypproject/CustomerJourneyAnalyser/svm/dtree_data/model.pkl')
   # model2 = joblib.load('../dtree_data/model.pkl')

   # j = [1,-2.99]
   # print model2.predict(j)
    results = model_selection.cross_val_score(model, X, Y, cv=kfold)
    print(results.mean())

def dtree_predict(listloyal):
    model2 = joblib.load('/Users/heshanjayasinghe/Documents/finalYearProject/fypproject/CustomerJourneyAnalyser/svm/dtree_data/model.pkl')
   # j = [1, -2.99]
    print model2.predict(listloyal)
    return model2.predict(listloyal)


if __name__ == "__main__":
    dtree_predict();