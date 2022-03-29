
#include <iostream>
#include <vector>

#include "study.hpp"

/*
## sortArrayByParity ##
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Input: nums = [0]
Output: [0]
*/
/*
## maxPower ##
Input: s = "leetcode"
Output: 2
Explanation: The substring "ee" is of length 2 with the character 'e' only.

Input: s = "abbcccddddeeeeedcba"
Output: 5
Explanation: The substring "eeeee" is of length 5 with the character 'e' only.
*/

class Solution_1 : public Solution {
private:
    int oddMove(int n, int start, std::vector<int>& nums) {
        for (int i = start; i < nums.size(); i++) {
            if (nums[i] % 2) {
                return oddMove(n, i + 1, nums);
            }
            else {
                int tmp = nums[i];
                nums[i] = n;
                return tmp;
            }
        }
        return -1;
    }
    std::vector<int> sortArrayByParity(std::vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] % 2) {
                int n = oddMove(nums[i], i + 1, nums);
                if (n == -1) {
                    return nums;
                }
                nums[i] = n;
            }
        }
        return nums;
    }
    int maxPower(std::string s) {
        int ret = 0;
        int cnt = 1;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == s[i + 1]) {
                cnt++;
            }
            else {
                if (ret < cnt) {
                    ret = cnt;
                }
                cnt = 1;
            }
        }        
        return ret;
    }
public:
    void run() {
        //std::vector<int> nums = { 3,1,2,4 };
        //std::vector<int> nums = { 0 };
        //std::vector<int> ret = this->sortArrayByParity(nums);
        //std::cout << "[ ";
        //for (auto num : ret) {
        //    std::cout << num << " ";
        //}
        //std::cout << "]";

        std::cout << this->maxPower("abbcccddddeeeeedcba") << "\n";
    }
};