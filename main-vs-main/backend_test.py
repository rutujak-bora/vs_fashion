import requests
import sys
import json
from datetime import datetime

class VSFashionAPITester:
    def __init__(self, base_url="https://vs-fashion-store-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.user_token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_user = {
            "full_name": "Test Customer",
            "email": f"testuser_{datetime.now().strftime('%H%M%S')}@example.com",
            "mobile": "9876543210",
            "address": "123 Test Street, Test City",
            "password": "TestPass123!"
        }
        self.product_id = None
        self.collection_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                if files:
                    # Remove Content-Type for file uploads
                    del default_headers['Content-Type']
                    response = requests.post(url, data=data, headers=default_headers, files=files, timeout=30)
                elif 'application/x-www-form-urlencoded' in default_headers.get('Content-Type', ''):
                    response = requests.post(url, data=data, headers=default_headers, timeout=30)
                else:
                    response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method == 'PUT':
                if files:
                    del default_headers['Content-Type']
                    response = requests.put(url, data=data, headers=default_headers, files=files, timeout=30)
                elif 'application/x-www-form-urlencoded' in default_headers.get('Content-Type', ''):
                    response = requests.put(url, data=data, headers=default_headers, timeout=30)
                else:
                    response = requests.put(url, json=data, headers=default_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}")

            try:
                return success, response.json() if response.text else {}
            except:
                return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    # Auth Tests
    def test_user_registration(self):
        """Test user registration"""
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=self.test_user
        )
        if success and 'token' in response:
            self.user_token = response['token']
            return True
        return False

    def test_user_login(self):
        """Test user login"""
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data={"email": self.test_user["email"], "password": self.test_user["password"]}
        )
        if success and 'token' in response:
            self.user_token = response['token']
            return True
        return False

    def test_admin_login(self):
        """Test admin login with seeded credentials"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/admin/login",
            200,
            data={"email": "vsfashiiiion@gmail.com", "password": "vs@54321"}
        )
        if success and 'token' in response:
            self.admin_token = response['token']
            return True
        return False

    # Banner Tests
    def test_get_banners(self):
        """Test fetching hero banners"""
        success, response = self.run_test(
            "Get Hero Banners",
            "GET",
            "banners",
            200
        )
        return success and isinstance(response, list)

    # Collection Tests
    def test_get_collections(self):
        """Test fetching collections"""
        success, response = self.run_test(
            "Get Collections",
            "GET",
            "collections",
            200
        )
        if success and isinstance(response, list) and len(response) > 0:
            self.collection_id = response[0]['id']
            return True
        return success

    def test_create_collection(self):
        """Test creating a collection (admin only)"""
        if not self.admin_token:
            return False
            
        success, response = self.run_test(
            "Create Collection",
            "POST",
            "collections",
            200,
            data={
                "name": f"Test Collection {datetime.now().strftime('%H%M%S')}",
                "description": "Test collection description",
                "is_active": True
            },
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        if success and 'id' in response:
            self.collection_id = response['id']
            return True
        return False

    # Product Tests
    def test_get_trending_products(self):
        """Test fetching trending products"""
        success, response = self.run_test(
            "Get Trending Products",
            "GET",
            "products?is_trending=true",
            200
        )
        return success and isinstance(response, list)

    def test_get_new_arrivals(self):
        """Test fetching new arrival products"""
        success, response = self.run_test(
            "Get New Arrivals",
            "GET",
            "products?is_new_arrival=true",
            200
        )
        return success and isinstance(response, list)

    def test_get_best_sellers(self):
        """Test fetching best seller products"""
        success, response = self.run_test(
            "Get Best Sellers",
            "GET",
            "products?is_best_seller=true",
            200
        )
        return success and isinstance(response, list)

    def test_create_product(self):
        """Test creating a product (admin only)"""
        if not self.admin_token or not self.collection_id:
            return False
            
        product_data = {
            "name": f"Test Product {datetime.now().strftime('%H%M%S')}",
            "collection_id": self.collection_id,
            "description": "Test product description for VS Fashion testing",
            "sizes": '["S", "M", "L"]',
            "color": "Blue",
            "size_guide": "Standard sizing",
            "quantity": "10",
            "price": "2999.99",
            "discount_price": "2499.99",
            "is_trending": "true",
            "is_new_arrival": "true",
            "is_best_seller": "false",
            "images": "[]"
        }
        
        success, response = self.run_test(
            "Create Product",
            "POST",
            "products",
            200,
            data=product_data,
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        if success and 'id' in response:
            self.product_id = response['id']
            return True
        return False

    def test_get_product_details(self):
        """Test fetching product details"""
        if not self.product_id:
            # Try to get any existing product
            success, response = self.run_test(
                "Get All Products",
                "GET",
                "products",
                200
            )
            if success and isinstance(response, list) and len(response) > 0:
                self.product_id = response[0]['id']
            else:
                return False
                
        success, response = self.run_test(
            "Get Product Details",
            "GET",
            f"products/{self.product_id}",
            200
        )
        return success and 'id' in response

    # Cart Tests
    def test_add_to_cart(self):
        """Test adding item to cart"""
        if not self.user_token or not self.product_id:
            return False
            
        success, response = self.run_test(
            "Add to Cart",
            "POST",
            "cart",
            200,
            data={
                "product_id": self.product_id,
                "quantity": 2,
                "size": "M"
            },
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        return success

    def test_get_cart(self):
        """Test fetching cart items"""
        if not self.user_token:
            return False
            
        success, response = self.run_test(
            "Get Cart",
            "GET",
            "cart",
            200,
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        return success and 'items' in response

    # Order Tests
    def test_create_order(self):
        """Test creating an order"""
        if not self.user_token or not self.product_id:
            return False
            
        success, response = self.run_test(
            "Create Order",
            "POST",
            "orders",
            200,
            data={
                "items": [{
                    "product_id": self.product_id,
                    "product_name": "Test Product",
                    "size": "M",
                    "quantity": 1,
                    "price": 2499.99
                }],
                "total_amount": 2499.99
            },
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        return success and 'order_id' in response

    def test_get_user_orders(self):
        """Test fetching user orders"""
        if not self.user_token:
            return False
            
        success, response = self.run_test(
            "Get User Orders",
            "GET",
            "orders",
            200,
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        return success and isinstance(response, list)

    # Profile Tests
    def test_get_profile(self):
        """Test fetching user profile"""
        if not self.user_token:
            return False
            
        success, response = self.run_test(
            "Get User Profile",
            "GET",
            "profile",
            200,
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        return success and 'email' in response

    def test_update_profile(self):
        """Test updating user profile"""
        if not self.user_token:
            return False
            
        profile_data = {
            "full_name": "Updated Test User",
            "mobile": "9876543211",
            "address": "456 Updated Street, Test City"
        }
        
        success, response = self.run_test(
            "Update Profile",
            "PUT",
            "profile",
            200,
            data=profile_data,
            headers={"Authorization": f"Bearer {self.user_token}", "Content-Type": "application/x-www-form-urlencoded"}
        )
        return success

    # Admin Tests
    def test_admin_get_customers(self):
        """Test admin fetching customers"""
        if not self.admin_token:
            return False
            
        success, response = self.run_test(
            "Admin - Get Customers",
            "GET",
            "admin/customers",
            200,
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        return success and isinstance(response, list)

    def test_admin_get_orders(self):
        """Test admin fetching all orders"""
        if not self.admin_token:
            return False
            
        success, response = self.run_test(
            "Admin - Get All Orders",
            "GET",
            "admin/orders",
            200,
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        return success and isinstance(response, list)

    def test_admin_inventory(self):
        """Test admin fetching inventory"""
        if not self.admin_token:
            return False
            
        success, response = self.run_test(
            "Admin - Get Inventory",
            "GET",
            "admin/inventory",
            200,
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        return success and isinstance(response, list)

    # Content Tests
    def test_get_content_pages(self):
        """Test fetching content pages"""
        for page_id in ['terms', 'faq']:
            success, response = self.run_test(
                f"Get {page_id.upper()} Content",
                "GET",
                f"content/{page_id}",
                200
            )
            if not success:
                return False
        return True

def main():
    print("🚀 Starting VS Fashion API Testing...")
    tester = VSFashionAPITester()
    
    # Test sequence with dependencies
    test_results = []
    
    # Basic endpoint tests
    print("\n📋 Testing Basic Endpoints...")
    test_results.append(("API Root", tester.run_test("API Root", "GET", "", 200)[0]))
    test_results.append(("Get Banners", tester.test_get_banners()))
    test_results.append(("Get Collections", tester.test_get_collections()))
    test_results.append(("Get Content Pages", tester.test_get_content_pages()))
    
    # Product browsing tests
    print("\n🛍️ Testing Product Browsing...")
    test_results.append(("Get Trending Products", tester.test_get_trending_products()))
    test_results.append(("Get New Arrivals", tester.test_get_new_arrivals()))
    test_results.append(("Get Best Sellers", tester.test_get_best_sellers()))
    
    # Authentication tests
    print("\n🔐 Testing Authentication...")
    test_results.append(("User Registration", tester.test_user_registration()))
    test_results.append(("Admin Login", tester.test_admin_login()))
    
    # Admin functionality tests
    print("\n👨‍💼 Testing Admin Functions...")
    test_results.append(("Create Collection", tester.test_create_collection()))
    test_results.append(("Create Product", tester.test_create_product()))
    test_results.append(("Admin Get Customers", tester.test_admin_get_customers()))
    test_results.append(("Admin Get Orders", tester.test_admin_get_orders()))
    test_results.append(("Admin Inventory", tester.test_admin_inventory()))
    
    # User flow tests
    print("\n👤 Testing User Flow...")
    test_results.append(("Get Product Details", tester.test_get_product_details()))
    test_results.append(("Get Profile", tester.test_get_profile()))
    test_results.append(("Update Profile", tester.test_update_profile()))
    test_results.append(("Add to Cart", tester.test_add_to_cart()))
    test_results.append(("Get Cart", tester.test_get_cart()))
    test_results.append(("Create Order", tester.test_create_order()))
    test_results.append(("Get User Orders", tester.test_get_user_orders()))
    
    # Print summary
    print(f"\n📊 Test Results Summary:")
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    print(f"\n📝 Individual Test Results:")
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status} - {test_name}")
    
    # Return success if all critical tests pass
    critical_failures = [name for name, result in test_results if not result and "Admin" not in name]
    
    if len(critical_failures) == 0:
        print(f"\n🎉 All critical tests passed!")
        return 0
    else:
        print(f"\n⚠️ Critical test failures: {len(critical_failures)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())