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
    }

    @IBAction func toHomeViewController(_ sender: Any) {
        
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

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
