"""
Kambaz Node.js Backend API Test Suite
Assignment 5 - RESTful Web APIs Testing

Author: Chandan Gowda Keelara Shivanna
Course: CS 5610 Section 02

This test suite validates all backend endpoints including:
- Lab 5 exercises (Path/Query Parameters, Objects, Arrays)
- Kambaz APIs (Users, Courses, Modules, Assignments, Enrollments)

Requirements:
    pip install requests colorama

Usage:
    # Test local server
    python test_backend.py
    
    # Test production server on Render
    python test_backend.py --url https://your-app.onrender.com
    
    # Test with custom URL
    python test_backend.py --url http://localhost:5000
    
    # Verbose output
    python test_backend.py --verbose
"""

import requests
import json
import argparse
from typing import Dict, Any
from colorama import Fore, Style, init

# Initialize colorama for colored output
init(autoreset=True)

# Default URL
DEFAULT_URL = "http://localhost:4000"

class TestResult:
    """Track test results"""
    def __init__(self, verbose=False):
        self.passed = 0
        self.failed = 0
        self.errors = []
        self.verbose = verbose
    
    def add_pass(self, test_name: str, response=None):
        self.passed += 1
        print(f"{Fore.GREEN}✓ PASS: {test_name}{Style.RESET_ALL}")
        if self.verbose and response:
            print(f"  Response: {response.text[:100]}...")
    
    def add_fail(self, test_name: str, error: str):
        self.failed += 1
        self.errors.append((test_name, error))
        print(f"{Fore.RED}✗ FAIL: {test_name}")
        print(f"  Error: {error}{Style.RESET_ALL}")
    
    def print_summary(self):
        total = self.passed + self.failed
        print(f"\n{Fore.CYAN}{'='*70}")
        print(f"TEST SUMMARY")
        print(f"{'='*70}{Style.RESET_ALL}")
        print(f"Total Tests: {total}")
        print(f"{Fore.GREEN}Passed: {self.passed}{Style.RESET_ALL}")
        print(f"{Fore.RED}Failed: {self.failed}{Style.RESET_ALL}")
        
        if total > 0:
            percentage = (self.passed / total) * 100
            print(f"Success Rate: {Fore.CYAN}{percentage:.1f}%{Style.RESET_ALL}")
        
        if self.failed > 0:
            print(f"\n{Fore.RED}Failed Tests:{Style.RESET_ALL}")
            for test_name, error in self.errors:
                print(f"  - {test_name}: {error}")
        
        if self.passed == total and total > 0:
            print(f"\n{Fore.GREEN}{'='*70}")
            print(f"🎉 ALL TESTS PASSED! 🎉")
            print(f"{'='*70}{Style.RESET_ALL}")
        elif self.failed > 0:
            print(f"\n{Fore.YELLOW}⚠️  Some tests failed. Review errors above.{Style.RESET_ALL}")

# Global results object
results = None

def test_endpoint(name: str, method: str, url: str, expected_status: int = 200, 
                  data: Dict = None, check_response: callable = None):
    """Generic test function for API endpoints"""
    try:
        full_url = f"{BASE_URL}{url}"
        
        if method == "GET":
            response = requests.get(full_url, timeout=30)
        elif method == "POST":
            response = requests.post(full_url, json=data, timeout=30)
        elif method == "PUT":
            response = requests.put(full_url, json=data, timeout=30)
        elif method == "DELETE":
            response = requests.delete(full_url, timeout=30)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        # Check status code
        if response.status_code != expected_status:
            results.add_fail(name, f"Expected status {expected_status}, got {response.status_code}")
            return
        
        # Custom response validation
        if check_response:
            try:
                check_response(response)
            except AssertionError as e:
                results.add_fail(name, str(e))
                return
        
        results.add_pass(name, response)
        
    except requests.exceptions.Timeout:
        results.add_fail(name, "Request timeout (30s)")
    except requests.exceptions.RequestException as e:
        results.add_fail(name, f"Request failed: {str(e)}")
    except Exception as e:
        results.add_fail(name, f"Unexpected error: {str(e)}")

# ============================================================================
# LAB 5 TESTS
# ============================================================================

def test_lab5():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("LAB 5 - Path Parameters, Query Parameters, Objects, Arrays")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    # Path Parameters
    print(f"{Fore.CYAN}Testing Path Parameters...{Style.RESET_ALL}")
    test_endpoint("Lab5: Add 34 + 23", "GET", "/lab5/add/34/23",
                  check_response=lambda r: assert_equal(r.text, "57"))
    
    test_endpoint("Lab5: Subtract 34 - 23", "GET", "/lab5/subtract/34/23",
                  check_response=lambda r: assert_equal(r.text, "11"))
    
    test_endpoint("Lab5: Multiply 34 * 23", "GET", "/lab5/multiply/34/23",
                  check_response=lambda r: assert_equal(r.text, "782"))
    
    test_endpoint("Lab5: Divide 34 / 23", "GET", "/lab5/divide/34/23",
                  check_response=lambda r: assert_contains(r.text, "1.4"))
    
    # Query Parameters
    print(f"\n{Fore.CYAN}Testing Query Parameters...{Style.RESET_ALL}")
    test_endpoint("Lab5: Calculator Add", "GET", "/lab5/calculator?operation=add&a=34&b=23",
                  check_response=lambda r: assert_equal(r.text, "57"))
    
    test_endpoint("Lab5: Calculator Subtract", "GET", "/lab5/calculator?operation=subtract&a=34&b=23",
                  check_response=lambda r: assert_equal(r.text, "11"))
    
    test_endpoint("Lab5: Calculator Multiply", "GET", "/lab5/calculator?operation=multiply&a=34&b=23",
                  check_response=lambda r: assert_equal(r.text, "782"))
    
    test_endpoint("Lab5: Calculator Divide", "GET", "/lab5/calculator?operation=divide&a=34&b=23",
                  check_response=lambda r: assert_contains(r.text, "1.4"))
    
    # Working with Objects
    print(f"\n{Fore.CYAN}Testing Working with Objects...{Style.RESET_ALL}")
    test_endpoint("Lab5: Get Assignment", "GET", "/lab5/assignment",
                  check_response=lambda r: assert_key_exists(r.json(), "title"))
    
    test_endpoint("Lab5: Get Assignment Title", "GET", "/lab5/assignment/title",
                  check_response=lambda r: assert_is_string(r.json()))
    
    test_endpoint("Lab5: Update Assignment Title", "GET", "/lab5/assignment/title/NewTitle",
                  check_response=lambda r: assert_equal(r.json()["title"], "NewTitle"))
    
    test_endpoint("Lab5: Get Module", "GET", "/lab5/module",
                  check_response=lambda r: assert_key_exists(r.json(), "name"))
    
    test_endpoint("Lab5: Get Module Name", "GET", "/lab5/module/name",
                  check_response=lambda r: assert_is_string(r.json()))
    
    # Working with Arrays
    print(f"\n{Fore.CYAN}Testing Working with Arrays...{Style.RESET_ALL}")
    test_endpoint("Lab5: Get All Todos", "GET", "/lab5/todos",
                  check_response=lambda r: assert_is_array(r.json()))
    
    test_endpoint("Lab5: Get Todo by ID", "GET", "/lab5/todos/1",
                  check_response=lambda r: assert_key_exists(r.json(), "id"))
    
    test_endpoint("Lab5: Get Completed Todos", "GET", "/lab5/todos/completed/true",
                  check_response=lambda r: assert_is_array(r.json()))
    
    # Create Todo
    new_todo = {"title": "Test Todo", "completed": False}
    test_endpoint("Lab5: Create Todo", "POST", "/lab5/todos",
                  data=new_todo,
                  check_response=lambda r: assert_key_exists(r.json(), "id"))
    
    # Error Handling
    test_endpoint("Lab5: Error - Todo Not Found", "GET", "/lab5/todos/9999",
                  expected_status=404,
                  check_response=lambda r: assert_key_exists(r.json(), "message"))

# ============================================================================
# KAMBAZ - USERS TESTS
# ============================================================================

def test_users():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("KAMBAZ - Users & Authentication")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    test_endpoint("Users: Get All Users", "GET", "/api/users",
                  check_response=lambda r: assert_is_array(r.json()))
    
    test_endpoint("Users: Get User by ID", "GET", "/api/users/121",
                  check_response=lambda r: assert_equal(r.json()["username"], "iron_man"))
    
    # Sign in
    credentials = {"username": "iron_man", "password": "stark123"}
    test_endpoint("Users: Sign In", "POST", "/api/users/signin",
                  data=credentials,
                  check_response=lambda r: assert_equal(r.json()["username"], "iron_man"))
    
    # Sign up
    import time
    new_user = {
        "username": f"testuser_{int(time.time())}",
        "password": "test123",
        "firstName": "Test",
        "lastName": "User",
        "email": "test@test.com",
        "role": "STUDENT"
    }
    test_endpoint("Users: Sign Up", "POST", "/api/users/signup",
                  data=new_user,
                  check_response=lambda r: assert_key_exists(r.json(), "_id"))

# ============================================================================
# KAMBAZ - COURSES TESTS
# ============================================================================

def test_courses():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("KAMBAZ - Courses")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    test_endpoint("Courses: Get All Courses", "GET", "/api/courses",
                  check_response=lambda r: assert_is_array(r.json()))
    
    test_endpoint("Courses: Get Course by ID", "GET", "/api/courses/1234",
                  check_response=lambda r: assert_equal(r.json()["_id"], "1234"))
    
    # Create Course
    new_course = {
        "name": "Test Course",
        "number": "TEST101",
        "startDate": "2024-01-01",
        "endDate": "2024-05-01",
        "department": "CS",
        "credits": 3,
        "description": "Test Course Description"
    }
    test_endpoint("Courses: Create Course", "POST", "/api/courses",
                  data=new_course,
                  check_response=lambda r: assert_key_exists(r.json(), "_id"))

# ============================================================================
# KAMBAZ - MODULES TESTS
# ============================================================================

def test_modules():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("KAMBAZ - Modules")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    test_endpoint("Modules: Get Modules for Course", "GET", "/api/courses/1234/modules",
                  check_response=lambda r: assert_is_array(r.json()))
    
    # Create Module
    new_module = {
        "name": "Test Module",
        "description": "Test Module Description"
    }
    test_endpoint("Modules: Create Module", "POST", "/api/courses/1234/modules",
                  data=new_module,
                  check_response=lambda r: assert_key_exists(r.json(), "_id"))

# ============================================================================
# KAMBAZ - ASSIGNMENTS TESTS
# ============================================================================

def test_assignments():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("KAMBAZ - Assignments")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    test_endpoint("Assignments: Get Assignments for Course", "GET", "/api/courses/1234/assignments",
                  check_response=lambda r: assert_is_array(r.json()))
    
    # Create Assignment
    new_assignment = {
        "title": "Test Assignment",
        "description": "Test Assignment Description",
        "points": 100,
        "dueDate": "2024-12-31"
    }
    test_endpoint("Assignments: Create Assignment", "POST", "/api/courses/1234/assignments",
                  data=new_assignment,
                  check_response=lambda r: assert_key_exists(r.json(), "_id"))

# ============================================================================
# KAMBAZ - ENROLLMENTS TESTS
# ============================================================================

def test_enrollments():
    print(f"\n{Fore.YELLOW}{'='*70}")
    print("KAMBAZ - Enrollments")
    print(f"{'='*70}{Style.RESET_ALL}\n")
    
    test_endpoint("Enrollments: Get User Enrollments", "GET", "/api/users/121/enrollments",
                  check_response=lambda r: assert_is_array(r.json()))
    
    test_endpoint("Enrollments: Get Course Enrollments", "GET", "/api/courses/1234/enrollments",
                  check_response=lambda r: assert_is_array(r.json()))

# ============================================================================
# HELPER ASSERTION FUNCTIONS
# ============================================================================

def assert_equal(actual, expected):
    """Assert that two values are equal"""
    assert actual == expected, f"Expected {expected}, got {actual}"

def assert_contains(actual, substring):
    """Assert that a string contains a substring"""
    assert substring in str(actual), f"Expected '{substring}' in '{actual}'"

def assert_is_array(data):
    """Assert that data is an array/list"""
    assert isinstance(data, list), f"Expected array, got {type(data)}"
    assert len(data) > 0, "Array is empty"

def assert_is_string(data):
    """Assert that data is a string"""
    assert isinstance(data, str), f"Expected string, got {type(data)}"

def assert_key_exists(data: Dict, key: str):
    """Assert that a key exists in dictionary"""
    assert key in data, f"Key '{key}' not found in response"

# ============================================================================
# MAIN TEST RUNNER
# ============================================================================

def run_all_tests():
    """Run all test suites"""
    print(f"\n{Fore.CYAN}{'='*70}")
    print("KAMBAZ BACKEND API TEST SUITE")
    print("Assignment 5 - RESTful Web APIs")
    print(f"{'='*70}{Style.RESET_ALL}")
    print(f"Testing server at: {Fore.GREEN}{BASE_URL}{Style.RESET_ALL}")
    
    # Determine environment
    if "localhost" in BASE_URL:
        env = f"{Fore.YELLOW}LOCAL{Style.RESET_ALL}"
    elif "onrender.com" in BASE_URL:
        env = f"{Fore.BLUE}PRODUCTION (Render){Style.RESET_ALL}"
    else:
        env = f"{Fore.MAGENTA}CUSTOM{Style.RESET_ALL}"
    
    print(f"Environment: {env}\n")
    
    # Check if server is running
    print(f"{Fore.CYAN}Checking server connection...{Style.RESET_ALL}")
    try:
        response = requests.get(f"{BASE_URL}/hello", timeout=30)
        if response.status_code == 200:
            print(f"{Fore.GREEN}✓ Server is online and responding!{Style.RESET_ALL}")
            print(f"Response: {response.text}\n")
        else:
            print(f"{Fore.RED}✗ Server responded with status {response.status_code}{Style.RESET_ALL}\n")
    except requests.exceptions.Timeout:
        print(f"{Fore.RED}✗ ERROR: Server connection timeout (30s)")
        print(f"The server might be starting up. Wait a few minutes and try again.{Style.RESET_ALL}\n")
        return
    except requests.exceptions.RequestException as e:
        print(f"{Fore.RED}✗ ERROR: Cannot connect to server at {BASE_URL}")
        print(f"Error: {str(e)}")
        print(f"Make sure the server is running!{Style.RESET_ALL}\n")
        return
    
    # Run all test suites
    test_lab5()
    test_users()
    test_courses()
    test_modules()
    test_assignments()
    test_enrollments()
    
    # Print summary
    results.print_summary()

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='Test Kambaz Backend API',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  # Test local server
  python test_backend.py
  
  # Test production server on Render
  python test_backend.py --url https://kambaz-node-server-app-a5.onrender.com
  
  # Verbose output
  python test_backend.py --verbose
  
  # Test custom server
  python test_backend.py --url http://192.168.1.100:4000
        '''
    )
    
    parser.add_argument(
        '--url',
        type=str,
        default=DEFAULT_URL,
        help=f'Base URL of the server (default: {DEFAULT_URL})'
    )
    
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Enable verbose output'
    )
    
    return parser.parse_args()

if __name__ == "__main__":
    # Parse command line arguments
    args = parse_arguments()
    
    # Set global BASE_URL
    BASE_URL = args.url.rstrip('/')  # Remove trailing slash if present
    
    # Initialize results tracker
    results = TestResult(verbose=args.verbose)
    
    # Run tests
    run_all_tests()
