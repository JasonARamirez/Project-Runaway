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
    
    @IBOutlet weak var toSignUpButton: UIButton!
    
    @IBOutlet weak var forgotEmailButton: UIButton!

    @IBOutlet weak var forgotPasswordButton: UIButton!
    
    @IBOutlet weak var logInButton: UIButton!
    
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBAction func toSignUpViewController(_ sender: Any) {
        // TODO: - perform segue
    }

    @IBAction func toHomeViewController(_ sender: Any) {
        // TODO: - perform segue
    }
    
    @IBAction func toForgotUsernameViewController(_ sender: Any) {
        // TODO: - perform segue
    }

    @IBAction func toForgotPasswordViewController(_ sender: Any) {
        // TODO: - perform segue
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        /*
            Use Alamofire to connect to our database through our Node.js API
        */
        
        Alamofire.request("https://project-runaway.herokuapp.com/get") .responseJSON { response in
            
            
            print(response.request)  // original URL request
            print(response.response) // URL response
            print(response.data)     // server data
            print(response.result)   // result of response serialization
            
            if let JSON = response.result.value {
                print("JSON: \(JSON)")
            }
        }
        
        
    }
    
    // TODO: - Log In function
    // get response via a callback
    // if the entered username and password match our records,
    // save this info and send to the next view controller via prepareForSegue below
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
