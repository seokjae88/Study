#include <iostream>

#include <string>
#include <vector>
#include <queue>

using namespace std;

int getDownPrices(int n, int p, vector<int>& prices) {
    for (int i = n; i < prices.size(); i++) {
        if (prices[i] < p) {
            return (i - (n - 1));
        }
    }
    return (prices.size() - n);
}

vector<int> solution(vector<int> prices) {
    vector<int> answer;

    for (int i = 0; i < prices.size(); i++) {
        answer.push_back(getDownPrices(i + 1, prices[i], prices));
    }

    return answer;
}

void stock() {
    vector<int> prices = { 1, 2, 3, 2, 3 }; // [4, 3, 1, 1, 0]

    for (int n : solution(prices)) {
        std::cout << n << "\n";
    }
}

/*
vector<int> solution(vector<int> prices) {
    vector<int> answer(prices.size());
    stack<int> s;
    int size = prices.size();
    for(int i=0;i<size;i++){
        while(!s.empty()&&prices[s.top()]>prices[i]){
            answer[s.top()] = i-s.top();
            s.pop();
        }
        s.push(i);
    }
    while(!s.empty()){
        answer[s.top()] = size-s.top()-1;
        s.pop();
    }
    return answer;
}
*/