//
//  LogInViewController.swift
//  Project Runaway
//
//  Created by DeQuan Burnside on 2/26/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import Alamofire
// MARK: -
// TODO: -
// FIXME: -


class LogInViewController: UIViewController {
    
    var alert: UIAlertController = UIAlertController(title: "Attention!", message: "Fill out the textboxes!", preferredStyle: UIAlertControllerStyle.alert)
    
    @IBOutlet weak var toSignUpButton: UIButton!
    
    @IBOutlet weak var forgotEmailButton: UIButton!

    @IBOutlet weak var forgotPasswordButton: UIButton!
    
    @IBOutlet weak var loginButton: UIButton!
    
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBAction func toSignUpViewController(_ sender: Any) {
    }

    @IBAction func toHomeViewController(_ sender: Any) {
        
        
    }
    
    @IBAction func loginButtonAction(_ sender: AnyObject) {
        
    }

    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.hideKeyboardWhenTappedAround()
        _ = self.textFieldShouldReturn(textField: emailTextField)
//        _ = self.textFieldShouldReturn(textField: passwordTextField)
        // Do any additional setup after loading the view.
        if(loginButton.isTouchInside == true){
            //Send to checklogin to see if sucess
            let isSuccess = shouldPerformSegue(withIdentifier: "login", sender: loginButton)
            if(isSuccess != true){
                //Creating the alert controller
                //It takes the title and the alert message and prefferred style
                let alertController = UIAlertController(title: "Hello  Coders", message: "Visit www.simplifiedios.net to learn xcode", preferredStyle: .alert)
                
                //then we create a default action for the alert...
                //It is actually a button and we have given the button text style and handler
                //currently handler is nil as we are not specifying any handler
                let defaultAction = UIAlertAction(title: "Close Alert", style: .default, handler: nil)
                
                //now we are adding the default action to our alertcontroller
                alertController.addAction(defaultAction)
                
                //and finally presenting our alert using this method
                present(alertController, animated: true, completion: nil)
                print("No Success here...")
            }
            print("Check")
        }
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.emailTextField.resignFirstResponder()
        self.passwordTextField.resignFirstResponder()
        self.view.endEditing(true)
        return true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        //if segue.identifier == "login" {
          //  _ = segue.destination as! HomeViewController
            
        //}
        
    }
 
    
    override func shouldPerformSegue(withIdentifier identifier: String?, sender: Any?) -> Bool {
        if let ident = identifier {
            if ident == "login" {
                //if checkLogin() != true {
                  //  alert = UIAlertController(title: "Attention!", message: "Wrong password or Username", preferredStyle: UIAlertControllerStyle.alert)
                    //alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
                    //return false
                //}
                if hcCheck() != true {
                    return false
                }
            }
        }
        return true
    }
    
    func hcCheck() -> Bool {
        if(emailTextField.text! == "jgn@iastate.edu" && passwordTextField.text! == "admin"){
            return true
        }
        return false
    }
    
    /* TODO: - Get request
       In this function, the app should GET a request from our Node.js server
       We should send our username and password
       Check:
          If True: segue into Home page
          If False: Alert user / Block segue
    */
    func checkLogin() -> Bool {
        /*
         Use Alamofire to connect to our database through our Node.js API
         */
        let success: Bool = false;
        
//        Alamofire.request("https://project-runaway.herokuapp.com/",method: .get, parameters: ["username":emailTextField.text,"password":passwordTextField.text]) .responseJSON { response in
//            print(response.request)  // original URL request
//            print(response.response) // URL response
//            print(response.data)     // server data
//            print(response.result)   // result of response serialization
//            
//            if let JSON = response.result.value {
//                print("JSON: \(JSON)")
//            }
//            
//            //success = response.result.isSuccess
//        }
        
        return success
    }
    
    //Send confirmation for forgot password
    func sendEmail(){
        //Check to see if email is in database
        
        //If true
            //Alert with email sent
        //If false
            //Alert email is not used
    }
    
   

}

// Put this piece of code anywhere you like
extension UIViewController {
    func hideKeyboardWhenTappedAround() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIViewController.dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }
    
//    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
//        view.endEditing(true)
//        return false
//    }
    
    func dismissKeyboard() {
        view.endEditing(true)
    }
}
